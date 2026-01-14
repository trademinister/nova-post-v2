export default {
  domestic: {
    shipping: {
      title: "Налаштування внутрішньої відправки",
      section: {
        personal_info: {
          title: "Особисті дані",
          sender: "Відправник",
          phone_number: "Номер телефону",
        },
        packaging: {
          title: "Пакування",
          extended_packaging: "Розширене пакування",
          configure_packaging: "Налаштувати пакування",
          select_uniform_packaging: "Обрати єдине пакування",
          default_shipping_description: "Опис за замовчуванням",
          add_sku_to_shipping: {
            title: "Додати артикули до відправлення",
            description:
              "Додавати артикули до опису та додаткової інформації про відправлення. Увага! Якщо опис залишити порожнім, система автоматично заповнить його даними з замовлення та додасть артикули.",
          },
        },
        optional_additional_services: {
          title: "Бажані додаткові послуги",
          cash_on_delivery: "Контроль оплати",
          return_delivery: "Зворотня доставка",
          declared_price: {
            title: "Оголошена вартість",
            price: "Ціна",
          },
          comission_pays: {
            title: "Комісію за переказ сплачує",
            sender: "Відправник",
            recipient: "Одержувач",
          },
        },
        dispatch_address: {
          title: "Адреса відправки",
          settlement: "Населений пункт",
          warehouse: "Відділення",
        },
        pickup_address: {
          title: "Адреса забору",
          settlement: "Населений пункт",
          street: "Вулиця",
          building: "Будинок",
          apartment: "Квартира",
        },
        shipment: {
          title: "Відправлення",
          type: {
            title: "Тип",
            parcel: "Посилка",
            cargo: "Вантаж",
            documents: "Документи",
            wheels_tires: "Шини/Диски",
            palets: "Палети",
          },
          delivery_payment_type: {
            title: "Спосіб оплати за доставку",
            cash: "Готівка",
            cashless: "Безготівковий",
          },
          delivery_payer: {
            title: "Оплачує доставку",
            sender: "Відправник",
            recipient: "Отримувач",
            third_person: "Третя особа",
          },
        },
        pickup_location: {
          title: "Місце відправлення",
          pickup_type: {
            title: "Тип місця відправлення",
            warehouse: "Відділення",
            address: "Адреса",
          },
        },
      },
      component: {
        uniform_package: {
          modal: {
            title: "Пакування",
            search: "Шукати пакування",
          },
        },
        settlement: {
          clickable: {
            placeholder: "Обрати населений пункт",
          },
          modal: {
            title: "Населені пункти",
            search: "Шукати населений пункт",
          },
        },
        warehouse: {
          clickable: {
            placeholder: "Обрати відділення",
          },
          modal: {
            title: "Відділення",
            search: "Шукати відділення",
          },
        },
        street: {
          clickable: {
            placeholder: "Обрати вулицю",
          },
          modal: {
            title: "Вулиці",
            search: "Шукати вулицю",
          },
        },
      },
    },
    delivery: {
      title: "Внутрішні методи доставки",
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
