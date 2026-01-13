//process orders __ обробка замовлень

export default {
  settings: {
    heading: {
      enable: "Увімкнути автоматичне виконання",
      order_risk_assissemnt: "Оцінка ризику замовлення",
      filtered_by_tags: "Фільтр за тегами",
      process_payment_method: "Методи оплати",
      fulfillment_settings: "Обробка замовлень",
      tools: "Інструменти",
    },
    ff_enable: "Увімкнути автоматичне виконання",
    process_payment_method: "Обробляти метод оплати",
    process_payment_method_tooltip:
      "Увімкнути автоматичну обробку методів оплати",
    payment_method_label: "Метод оплати",
    payment_method_placeholder: "Введіть назву методу оплати",
    add_payment_method: "Додати метод оплати",
    table_payment_methods: {
      headers: {
        name: "Назва",
        statuses: "Статуси",
        actions: "Дії",
      },
      statuses: {
        partialy_paid: "Частково оплачено",
        payment_pending: "Очікує оплати",
        paid: "Оплачено",
      },
    },
    order_risk_assissemnt: "Увімкнути оцінку ризику замовлення",
    order_risk_assissemnt_details:
      "Якщо замовлення має рівень ризику, який ви вибрали в чекбоксі, воно не буде виконано",
    order_risk_levels: {
      title: "Рівні ризику замовлення",
      low: "Низький",
      medium: "Середній",
      high: "Високий",
    },
    fulfill_by: {
      label: "Виконувати за",
      locations: "Локації",
      collections: "Колекції",
    },
    sort: "Сортувати",
    order_by: {
      label: "Сортувати за",
      name: "Назвою",
      destination_warehouse: "Складом призначення",
    },
    table_locations: {
      headers: {
        location: "Локація",
        destination_warehouse: "Склад призначення",
        remains_active: "Залишки активні",
        is_active: "Активна",
      },
    },
    table_collections: {
      headers: {
        collection: "Колекція",
        destination_warehouse: "Склад призначення",
        remains_active: "Залишки активні",
        is_active: "Активна",
      },
    },
    filtered_by_tags: {
      enable: "Увімкнути фільтр за тегами",
      enable_details:
        "Фільтрувати замовлення за тегами. Тільки замовлення з вибраними тегами не будуть виконані",
      types: {
        label: "Типи тегів",
        order: "Теги замовлення",
        customer: "Теги клієнта",
      },
      table: {
        headers: {
          value: "Значення тегу",
          type: "Типи",
          actions: "Дії",
        },
      },
    },
    tools: {
      reset_heading: "Скинути налаштування",
      reset_description:
        "Скинути всі налаштування виконання до значень за замовчуванням",
      logs_heading: "Переглянути логи",
      logs_description: "Переглянути логи виконання та історію",
    },
  },
  ff_status: {
    heading: "Статус виконання",
    authoriz_status: "Статус авторизації",
    authorized: "Авторизовано",
    unauthorized: "Не авторизовано",
    autoff_status: "Статус автоматичного виконання",
    enabled: "Увімкнено",
    disabled: "Вимкнено",
    curent_organization: "Поточна організація",
    no_organization: "Немає організації",
    toast: {
      success: {
        login_ff_success: "Успішно ввійшли в Nova Poshta",
        logout_ff_success: "Успішно вийшли з Nova Poshta",
        save_ff_settings_success: "Налаштування успішно збережено",
        save_ff_payment_method_success: "Метод оплати успішно додано",
        delete_ff_payment_method_success: "Метод оплати успішно видалено",
        update_ff_payment_method_success: "Метод оплати успішно оновлено",
        create_filtered_tag_success: "Тег фільтра успішно створено",
        delete_filtered_tag_success: "Тег фільтра успішно видалено",
        reset_ff_settings_success: "Налаштування успішно скинуто",
      },
      error: {
        np_unauthorized: "Не авторизовано. Перевірте свої облікові дані",
        unknown_error: "Сталася помилка",
        select_filtered_tags_types: "Будь ласка, виберіть принаймні один тип тегу",
      },
    },
  },
  auth: {
    form_title: "Авторизація Nova Poshta",
    np_login_label: "Логін Nova Poshta",
    np_login_required: "Логін обов'язковий",
    np_password_label: "Пароль Nova Poshta",
    np_password_required: "Пароль обов'язковий",
    np_organization_label: "Ключ організації",
    np_organization_tooltip:
      "Якщо ви хочете надсилати від імені іншого бізнесу, введіть Назву організації та Додатковий ключ організації",
    np_organization_required: "Ключ організації обов'язковий",
    additional_organization_key_label: "Додатковий ключ організації",
    logout: "Вихід",
    submit_button: "Увійти",
  },
};
