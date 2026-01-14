export default {
  domestic: {
    shipping: {
      title: "Domestic Shipping Settings",
      section: {
        personal_info: {
          title: "Personal information",
          sender: "Sender",
          phone_number: "Phone number",
        },
        packaging: {
          title: "Packaging",
          extended_packaging: "Extended packaging",
          configure_packaging: "Configure packaging",
          select_uniform_packaging: "Select uniform packaging",
          default_shipping_description: "Default description",
          add_sku_to_shipping: {
            title: "Add SKU to description",
            description:
              "Add item numbers (SKUs) to the description and to the additional shipping information. Attention! If you leave the description empty, the system will automatically fill it with the order data and add the item numbers (SKUs).",
          },
        },
        optional_additional_services: {
          title: "Optional additional services",
          cash_on_delivery: "Cash on delivery",
          return_delivery: "Return delivery",
          declared_price: {
            title: "Declared price",
            price: "Price",
          },
          comission_pays: {
            title: "Transfer fee paid by",
            sender: "Sender",
            recipient: "Recipient",
          },
        },
        dispatch_address: {
          title: "Dispatch address",
          settlement: "Settlement",
          warehouse: "Warehouse",
        },
        pickup_address: {
          title: "Pickup address",
          settlement: "Settlement",
          street: "Street",
          building: "Building",
          apartment: "Apartment",
        },
        shipment: {
          title: "Shipment",
          type: {
            title: "Type",
            parcel: "Parcel",
            cargo: "Cargo",
            documents: "Documents",
            wheels_tires: "Wheels/Tires",
            palets: "Palets",
          },
          delivery_payment_type: {
            title: "Delivery payment type",
            cash: "Cash",
            cashless: "Cashless",
          },
          delivery_payer: {
            title: "Shipping paid by",
            sender: "Sender",
            recipient: "Recipient",
            third_person: "Third person",
          },
        },
        pickup_location: {
          title: "Pickup location",
          pickup_type: {
            title: "Pickup location type",
            warehouse: "Warehouse",
            address: "Address",
          },
        },
      },
      component: {
        uniform_package: {
          modal: {
            title: "Packages",
            search: "Search for packages",
          }
        },
        settlement: {
          clickable: {
            placeholder: "Select a settlement",
          },
          modal: {
            title: "Settlements",
            search: "Search for settlements",
          },
        },
        warehouse: {
          clickable: {
            placeholder: "Select a warehouse",
          },
          modal: {
            title: "Warehouses",
            search: "Search for warehouse",
          },
        },
        street: {
          clickable: {
            placeholder: "Select a street",
          },
          modal: {
            title: "Streets",
            search: "Search for street",
          },
        },
      },
    },
    delivery: {
      title: "Domestic Delivery Methods",
    },
  },
  international: {
    shipping: {
      title: "International Shipping Settings",
    },
    delivery: {
      title: "International Delivery Methods",
    },
  },
  global: {
    shipping: {
      title: "Global Shipping Settings",
    },
    delivery: {
      title: "Global Delivery Methods",
    },
  },
};
