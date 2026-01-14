export default {
  settings: {
    heading: {
      enable: "Auto Fulfillment",
      order_risk_assissemnt: "Order Risk Assessment",
      filtered_by_tags: "Filter by Tags",
      process_payment_method: "Payment Methods",
      fulfillment_settings: "Process orders",
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
    order_risk_assissemnt: "Enable Order Risk Assessment",
    order_risk_assissemnt_details:
      "If an order has a risk level you selected in the checkbox, it will not be fulfilled",
    order_risk_levels: {
      title: "Order Risk Levels",
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
    filtered_by_tags: {
      enable: "Enable Filter by Tags",
      enable_details:
        "Filter orders by tags. Only orders with selected tags will be not fulfilled",
      types: {
        label: "Tag Types",
        order: "Order Tags",
        customer: "Customer Tags",
      },
      table: {
        headers: {
          value: "Tag Value",
          type: "Types",
          actions: "Actions",
        },
      },
    },
    tools: {
      reset_heading: "Reset Settings",
      reset_description:
        "Reset all fulfillment settings to their default values",
      logs_heading: "View Logs",
      logs_description: "View fulfillment logs and history",
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
    no_organization: "No Organization",
    toast: {
      success: {
        login_ff_success: "Successfully logged in to Nova Poshta",
        logout_ff_success: "Successfully logged out from Nova Poshta",
        save_ff_settings_success: "Settings saved successfully",
        save_ff_payment_method_success: "Payment method added successfully",
        delete_ff_payment_method_success: "Payment method deleted successfully",
        update_ff_payment_method_success: "Payment method updated successfully",
        create_filtered_tag_success: "Filtered tag created successfully",
        delete_filtered_tag_success: "Filtered tag deleted successfully",
        reset_ff_settings_success: "Settings reset successfully",
      },
      error: {
        np_unauthorized: "Unauthorized. Please check your credentials",
        unknown_error: "An error occurred",
        select_filtered_tags_types: "Please select at least one tag type",
      },
    },
  },
  auth: {
    form_title: "Nova Poshta Authorization",
    np_login_label: "Login",
    np_login_required: "Login is required",
    np_password_label: "Password",
    np_password_required: "Password is required",
    np_organization_label: "Organization Name",
    np_organization_tooltip:
      "If you want to send from another business, enter Organization Name and Additional Organization Key",
    np_organization_required: "Organization name is required",
    additional_organization_key_label: "Additional Organization Key",
    logout: "Logout",
    submit_button: "Authorize",
  },
};
