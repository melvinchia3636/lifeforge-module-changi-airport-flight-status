export interface Contract {
  getFlight: EndpointGetFlight;
}
export interface EndpointGetFlight {
  method: "get";
  input: {
    query?: EndpointGetFlight_InputQuery;
  };
  output: {
    OK: EndpointGetFlight_OutputOK;
  };
  media: null;
}
export interface EndpointGetFlight_InputQuery {
  type: "arr" | "dep";
}
export interface EndpointGetFlight_OutputOK {
  getFlights: {
    next_token: string;
    flights: {
      actual_timestamp: null;
      aircraft_type: string;
      airline: string;
      airline_details: {
        logo_url: string;
        code: string;
        name: string;
        name_zh: string;
        name_zh_hant: string | null;
        transfer_counters: string | null;
        transit: string;
      } | null;
      airport: string;
      airport_details: {
        code: string;
        country_code: string;
        lat: string;
        lng: string;
        name: string;
        name_zh: string;
        name_zh_hant: string;
      } | null;
      check_in_row: string | null;
      current_gate: string | null;
      direction: string;
      display_belt: null;
      display_checkinrowctr: string | null;
      display_gate: string | null;
      display_timestamp: string;
      drop_off_door: string | null;
      estimated_timestamp: string | null;
      flight_number: string;
      firstbag_timestamp: null;
      flight_status: string;
      flight_type: string;
      last_updated_timestamp: string;
      lastbag_timestamp: null;
      master_flight_number: string | null;
      nature: string;
      nearest_carpark: string | null;
      offblock_timestamp: string | null;
      origin_dep_country: null;
      origin_dep_date: null;
      origin_dep_terminal: null;
      origin_dep_time: null;
      origin_via_country: null;
      pick_up_door: null;
      previous_gate: string | null;
      scheduled_date: string;
      scheduled_time: string;
      slave_flights: string[];
      technical_flight_status1: string;
      technical_flight_status2: string;
      terminal: string;
      via: string | null;
      via_airport_details: {
        code: string;
        country_code: string;
        lat: string;
        lng: string;
        name: string;
        name_zh: string;
        name_zh_hant: string;
      } | null;
      status_mapping: {
        belt_status_en: null;
        belt_status_zh: null;
        details_status_en: string;
        details_status_zh: string;
        listing_status_en: string;
        listing_status_zh: string;
        show_gate: boolean;
        status_text_color: string;
      };
    }[];
  };
}
