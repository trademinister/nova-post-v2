export default {
  settings: {
    heading: {
      enable: "Enable Auto Fulfillment",
      order_risk_assissemnt: "Order Risk Assessment",
      process_payment_method: "Payment Methods",
      fulfillment_settings: "Fulfillment Settings",
      tools: "Tools",
    },
    ff_enable: "Enable Auto Fulfillment",
    process_payment_method: "Process Payment Method",
    process_payment_method_tooltip:
      "Enable automatic processing of payment methods",
    payment_method_label: "Payment Method",
    payment_method_placeholder: "Enter payment method name",
    add_payment_method: "Add Payment Method",
    table_payment_methods: {
      headers: {
        name: "Name",
        statuses: "Statuses",
        actions: "Actions",
      },
      statuses: {
        partialy_paid: "Partially Paid",
        payment_pending: "Payment Pending",
        paid: "Paid",
      },
    },
    order_risk_assissemnt: "Order Risk Assessment",
    order_risk_assissemnt_details:
      "Enable risk assessment for orders before fulfillment",
    order_risk_levels: {
      low: "Low",
      medium: "Medium",
      high: "High",
    },
    fulfill_by: {
      label: "Fulfill By",
      locations: "Locations",
      collections: "Collections",
    },
    sort: "Sort",
    order_by: {
      label: "Order By",
      name: "Name",
      destination_warehouse: "Destination Warehouse",
    },
    table_locations: {
      headers: {
        location: "Location",
        destination_warehouse: "Destination Warehouse",
        remains_active: "Remains Active",
        is_active: "Is Active",
      },
    },
    table_collections: {
      headers: {
        collection: "Collection",
        destination_warehouse: "Destination Warehouse",
        remains_active: "Remains Active",
        is_active: "Is Active",
      },
    },
    tools: {
      reset_heading: "Reset Settings",
      reset_description:
        "Reset all fulfillment settings to their default values",
    },
  },
  ff_status: {
    heading: "Fulfillment Status",
    authoriz_status: "Authorization Status",
    authorized: "Authorized",
    unauthorized: "Unauthorized",
    autoff_status: "Auto Fulfillment Status",
    enabled: "Enabled",
    disabled: "Disabled",
    curent_organization: "Current Organization",
    toast: {
      success: {
        login_ff_success: "Successfully logged in to Nova Poshta",
        logout_ff_success: "Successfully logged out from Nova Poshta",
        save_ff_settings_success: "Settings saved successfully",
        save_ff_payment_method_success: "Payment method added successfully",
        delete_ff_payment_method_success: "Payment method deleted successfully",
        update_ff_payment_method_success: "Payment method updated successfully",
      },
      error: {
        np_unauthorized: "Unauthorized. Please check your credentials",
        unknown_error: "An error occurred",
      },
    },
  },
  auth: {
    form_title: "Nova Poshta Authentication",
    np_login_label: "Nova Poshta Login",
    np_login_required: "Login is required",
    np_password_label: "Nova Poshta Password",
    np_password_required: "Password is required",
    np_organization_label: "Organization Key",
    np_organization_tooltip:
      "Enter your Nova Poshta organization key for authentication",
    np_organization_required: "Organization key is required",
    additional_organization_key_label: "Additional Organization Key",
    logout: "Logout",
    submit_button: "Login",
  },
};
