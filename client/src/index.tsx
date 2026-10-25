import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import {
  COLORS,
  Flex,
  Icon,
  Image,
  Listbox,
  ListboxOption,
  ModuleHeader,
  Scrollbar,
  SearchInput,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TagChip,
  Text,
  WithQuery,
  surface
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

const STATUSES: Record<string, { color: string; icon: string }> = {
  Departed: { color: COLORS['green-500'], icon: 'tabler:plane-departure' },
  Boarding: { color: COLORS['blue-500'], icon: 'tabler:users' },
  'Gate Closed': { color: COLORS['red-500'], icon: 'tabler:door-off' },
  'Gate Closing': { color: COLORS['orange-500'], icon: 'tabler:door' },
  'Gate Open': { color: COLORS['yellow-500'], icon: 'tabler:door-enter' },
  'New Gate': { color: COLORS['lime-500'], icon: 'tabler:transfer' },
  'Re-timed': { color: COLORS['fuchsia-500'], icon: 'tabler:clock' },
  Scheduled: { color: COLORS['indigo-500'], icon: 'tabler:calendar-event' },
  'Last Call': { color: COLORS['pink-500'], icon: 'tabler:bell' },
  Cancelled: { color: COLORS['red-500'], icon: 'tabler:ban' },
  Landed: { color: COLORS['blue-500'], icon: 'tabler:plane-arrival' },
  Confirmed: { color: COLORS['green-500'], icon: 'tabler:check' },
  Delayed: { color: COLORS['red-500'], icon: 'tabler:clock-stop' }
}

const SEARCH_TYPE = [
  ['Departures', 'tabler:plane-departure', 'dep'],
  ['Arrivals', 'tabler:plane-arrival', 'arr']
] as const

function ChangiAirportFlightStatus() {
  const [type, setType] = useState<'dep' | 'arr'>('dep')
  const [searchQuery, setSearchQuery] = useState('')

  const flightsQuery = useQuery(
    forgeAPI.getFlight.input({ type }).queryOptions()
  )

  return (
    <>
      <ModuleHeader />
      <Flex
        align="center"
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        mb="lg"
      >
        <Listbox
          bg={surface.defaultInteractive}
          minWidth="14rem"
          renderContent={() => (
            <Flex align="center" gap="xs">
              <Icon
                icon={
                  SEARCH_TYPE.find(([, , t]) => t === type)?.[1] ||
                  'tabler:plane-departure'
                }
                size="1.5rem"
              />
              <Text weight="medium" whiteSpace="nowrap">
                {SEARCH_TYPE.find(([, , t]) => t === type)?.[0] || 'Departure'}
              </Text>
            </Flex>
          )}
          value={type}
          width={{ base: '100%', sm: 'min-content' }}
          onChange={value => {
            setType(value)
          }}
        >
          {SEARCH_TYPE.map(([name, icon, value]) => (
            <ListboxOption key={value} icon={icon} label={name} value={value} />
          ))}
        </Listbox>
        <SearchInput
          searchTarget="flight"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </Flex>
      <Scrollbar style={{ flex: 1, width: '100%' }}>
        <WithQuery query={flightsQuery}>
          {flights => (
            <Table mb="xl" mr="xl" width="max-content">
              <TableHeader>
                <TableRow>
                  {[
                    'Status',
                    'Scheduled Time',
                    'Flight Number',
                    'Aircraft Type',
                    'Airline',
                    `${type === 'dep' ? 'Destination' : 'Origin'} Airport`,
                    'Terminal',
                    'Gate',
                    type === 'dep' ? 'Check-In Row' : 'Baggage Belt',
                    'Estimated Time',
                    'Code Share'
                  ].map(column => (
                    <TableHeaderCell key={column}>{column}</TableHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.getFlights.flights.map(flight => {
                  const status = STATUSES[flight.flight_status]

                  return (
                    <TableRow
                      key={flight.flight_number + flight.scheduled_time}
                    >
                      <TableCell nowrap align="center">
                        <TagChip
                          as="span"
                          color={status?.color}
                          icon={status?.icon}
                          label={flight.flight_status}
                        />
                      </TableCell>
                      <TableCell nowrap align="center">
                        {flight.scheduled_time}
                      </TableCell>
                      <TableCell nowrap align="center">
                        {flight.flight_number}
                      </TableCell>
                      <TableCell nowrap align="center">
                        <Flex align="center" gap="xs">
                          {flight.aircraft_type[0] &&
                          'AB'.includes(flight.aircraft_type[0]) ? (
                            <Icon
                              icon={
                                flight.aircraft_type[0] === 'B'
                                  ? 'simple-icons:boeing'
                                  : 'simple-icons:airbus'
                              }
                            />
                          ) : (
                            ''
                          )}
                          {flight.aircraft_type}
                        </Flex>
                      </TableCell>
                      <TableCell nowrap>
                        <Flex align="center" gap="sm">
                          {flight.airline_details?.logo_url && (
                            <Image
                              alt={flight.airline_details.name}
                              bg="transparent"
                              fallback={null}
                              fit="contain"
                              flexShrink="0"
                              height="1.5em"
                              src={flight.airline_details.logo_url}
                              width="1.5em"
                            />
                          )}
                          {flight.airline_details?.name ?? flight.airline} (
                          {flight.airline})
                        </Flex>
                      </TableCell>
                      <TableCell nowrap align="center">
                        {flight.airport_details?.name ?? flight.airport} (
                        {flight.airport})
                      </TableCell>
                      <TableCell nowrap align="center">
                        T{flight.terminal}
                      </TableCell>
                      <TableCell nowrap align="center">
                        {type === 'dep'
                          ? flight.current_gate
                          : flight.display_gate}
                      </TableCell>
                      <TableCell nowrap align="center">
                        {type === 'dep'
                          ? flight.check_in_row
                          : flight.display_belt}
                      </TableCell>
                      <TableCell nowrap align="center">
                        {flight.estimated_timestamp}
                      </TableCell>
                      <TableCell nowrap>
                        {flight.slave_flights.join(', ')}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </WithQuery>
      </Scrollbar>
    </>
  )
}

export default ChangiAirportFlightStatus
