/* eslint-disable */
module.exports = function meta_init($p) {
  $p.wsql.alasql('USE md; CREATE TABLE IF NOT EXISTS `ireg_log_view` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `key` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `ireg_log` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `date` INT, `sequence` INT, `class` CHAR, `note` CHAR, `obj` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `doc_calc_order` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, posted boolean, date Date, number_doc CHAR); CREATE TABLE IF NOT EXISTS `cat_delivery_directions` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_abonents` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `server` CHAR, `repl_mango` BOOLEAN, `repl_templates` BOOLEAN, `ts_acl_objs` JSON, `ts_ex_bases` JSON); CREATE TABLE IF NOT EXISTS `cat_servers` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `http` CHAR, `username` CHAR, `password` CHAR, `callbackurl` CHAR); CREATE TABLE IF NOT EXISTS `cat_individuals` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `birth_date` Date, `inn` CHAR, `imns_code` CHAR, `note` CHAR, `pfr_number` CHAR, `sex` CHAR, `birth_place` CHAR, `Фамилия` CHAR, `Имя` CHAR, `Отчество` CHAR, `ФамилияРП` CHAR, `ИмяРП` CHAR, `ОтчествоРП` CHAR, `ОснованиеРП` CHAR, `ДолжностьРП` CHAR, `Должность` CHAR, `captured` BOOLEAN, `zones` CHAR, `predefined_name` CHAR, `parent` CHAR, `ts_contact_information` JSON); CREATE TABLE IF NOT EXISTS `cat_nom_prices_types` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `price_currency` CHAR, `discount_percent` FLOAT, `vat_price_included` BOOLEAN, `rounding_order` CHAR, `rounding_in_a_big_way` BOOLEAN, `note` CHAR); CREATE TABLE IF NOT EXISTS `cat_stores` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `note` CHAR, `department` CHAR, `parent` CHAR, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_users` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `invalid` BOOLEAN, `department` CHAR, `individual_person` CHAR, `note` CHAR, `ancillary` BOOLEAN, `user_ib_uid` CHAR, `id` CHAR, `latin` CHAR, `prefix` CHAR, `branch` CHAR, `push_only` BOOLEAN, `roles` CHAR, `suffix` CHAR, `direct` BOOLEAN, `captured` BOOLEAN, `zones` CHAR, `ts_extra_fields` JSON, `ts_contact_information` JSON, `ts_acl_objs` JSON, `ts_ids` JSON, `ts_subscribers` JSON); CREATE TABLE IF NOT EXISTS `cat_divisions` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `main_project` CHAR, `sorting_field` INT, `parent` CHAR, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_furns` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_delivery_areas` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_production_params` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_parameters_keys` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `priority` INT, `note` CHAR, `sorting_field` INT, `applying` CHAR, `captured` BOOLEAN, `editor` CHAR, `zones` CHAR, `predefined_name` CHAR, `parent` CHAR, `ts_params` JSON); CREATE TABLE IF NOT EXISTS `cat_inserts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_organizations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `prefix` CHAR, `individual_legal` CHAR, `individual_entrepreneur` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `main_bank_account` CHAR, `main_cashbox` CHAR, `certificate_series_number` CHAR, `certificate_date_issue` Date, `certificate_authority_name` CHAR, `certificate_authority_code` CHAR, `chief` CHAR, `captured` BOOLEAN, `zones` CHAR, `parent` CHAR, `ts_contact_information` JSON, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_partners` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `name_full` CHAR, `main_bank_account` CHAR, `note` CHAR, `inn` CHAR, `kpp` CHAR, `ogrn` CHAR, `okpo` CHAR, `individual_legal` CHAR, `main_contract` CHAR, `identification_document` CHAR, `buyer_main_manager` CHAR, `is_buyer` BOOLEAN, `is_supplier` BOOLEAN, `primary_contact` CHAR, `parent` CHAR, `ts_contact_information` JSON, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_cashboxes` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `funds_currency` CHAR, `department` CHAR, `current_account` CHAR, `owner` CHAR); CREATE TABLE IF NOT EXISTS `cat_meta_ids` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `full_moniker` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_property_values` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `heft` FLOAT, `owner` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_contact_information_kinds` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `mandatory_fields` BOOLEAN, `type` CHAR, `predefined_name` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_currencies` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `name_full` CHAR, `extra_charge` FLOAT, `main_currency` CHAR, `parameters_russian_recipe` CHAR); CREATE TABLE IF NOT EXISTS `cat_branches` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `suffix` CHAR, `server` CHAR, `back_server` CHAR, `direct` BOOLEAN, `use` BOOLEAN, `mode` INT, `owner` CHAR, `parent` CHAR, `ts_organizations` JSON, `ts_partners` JSON, `ts_divisions` JSON, `ts_price_types` JSON, `ts_keys` JSON, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_choice_params` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `key` CHAR, `runtime` BOOLEAN, `condition_formula` CHAR, `field` CHAR, `ts_composition` JSON); CREATE TABLE IF NOT EXISTS `cat_formulas` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_destinations` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `predefined_name` CHAR, `parent` CHAR, `ts_extra_fields` JSON, `ts_extra_properties` JSON); CREATE TABLE IF NOT EXISTS `cat_banks_qualifier` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `correspondent_account` CHAR, `city` CHAR, `address` CHAR, `phone_numbers` CHAR, `activity_ceased` BOOLEAN, `swift` CHAR, `inn` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_organization_bank_accounts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `bank` CHAR, `bank_bic` CHAR, `funds_currency` CHAR, `account_number` CHAR, `settlements_bank` CHAR, `settlements_bank_bic` CHAR, `department` CHAR, `captured` BOOLEAN, `zones` CHAR, `owner` CHAR); CREATE TABLE IF NOT EXISTS `cat_partner_bank_accounts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `account_number` CHAR, `bank` CHAR, `settlements_bank` CHAR, `correspondent_text` CHAR, `appointments_text` CHAR, `funds_currency` CHAR, `bank_bic` CHAR, `bank_name` CHAR, `bank_correspondent_account` CHAR, `bank_city` CHAR, `bank_address` CHAR, `bank_phone_numbers` CHAR, `settlements_bank_bic` CHAR, `settlements_bank_correspondent_account` CHAR, `settlements_bank_city` CHAR, `owner` CHAR); CREATE TABLE IF NOT EXISTS `cat_params_links` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `master` CHAR, `slave` CHAR, `hide` BOOLEAN, `note` CHAR, `use_master` INT, `captured` BOOLEAN, `editor` CHAR, `zone` INT, `zones` CHAR, `parent` CHAR, `ts_leadings` JSON, `ts_values` JSON); CREATE TABLE IF NOT EXISTS `cat_scheme_settings` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `obj` CHAR, `user` CHAR, `order` INT, `query` CHAR, `date_from` Date, `date_till` Date, `standard_period` CHAR, `formula` CHAR, `output` CHAR, `tag` CHAR, `ts_fields` JSON, `ts_sorting` JSON, `ts_dimensions` JSON, `ts_resources` JSON, `ts_selection` JSON, `ts_params` JSON, `ts_composition` JSON, `ts_conditional_appearance` JSON); CREATE TABLE IF NOT EXISTS `cat_meta_fields` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_meta_objs` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cch_properties` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `shown` BOOLEAN, `sorting_field` INT, `extra_values_owner` CHAR, `available` BOOLEAN, `mandatory` BOOLEAN, `include_to_name` BOOLEAN, `list` INT, `caption` CHAR, `note` CHAR, `destination` CHAR, `tooltip` CHAR, `is_extra_property` BOOLEAN, `include_to_description` BOOLEAN, `calculated` CHAR, `showcalc` BOOLEAN, `predefined_name` CHAR, `type` JSON); CREATE TABLE IF NOT EXISTS `cch_predefined_elmnts` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `value` CHAR, `definition` CHAR, `synonym` CHAR, `list` INT, `zone` INT, `predefined_name` CHAR, `parent` CHAR, `type` CHAR, `ts_elmnts` JSON); CREATE TABLE IF NOT EXISTS `enm_individual_legal` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_contact_information_types` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_vat_rates` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_parameters_keys_applying` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_gender` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_text_aligns` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_contract_kinds` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_mutual_contract_settlements` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_report_output` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_quick_access` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_standard_period` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_data_field_kinds` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_label_positions` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_comparison_types` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_sort_directions` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); CREATE TABLE IF NOT EXISTS `enm_accumulation_record_type` (ref CHAR PRIMARY KEY NOT NULL, sequence INT, synonym CHAR); ', []);
  
  $p.md.init({"enm":{"accumulation_record_type":[{"order":0,"name":"debit","synonym":"Приход"},{"order":1,"name":"credit","synonym":"Расход"}],"sort_directions":[{"order":0,"name":"asc","synonym":"По возрастанию","default":true},{"order":1,"name":"desc","synonym":"По убыванию"}],"comparison_types":[{"order":0,"name":"gt","synonym":"Больше"},{"order":1,"name":"gte","synonym":"Больше или равно"},{"order":2,"name":"lt","synonym":"Меньше"},{"order":3,"name":"lte","synonym":"Меньше или равно "},{"order":4,"name":"eq","synonym":"Равно","default":true},{"order":5,"name":"ne","synonym":"Не равно"},{"order":6,"name":"in","synonym":"В списке"},{"order":7,"name":"nin","synonym":"Не в списке"},{"order":8,"name":"lke","synonym":"Содержит "},{"order":9,"name":"nlk","synonym":"Не содержит"},{"order":10,"name":"filled","synonym":"Заполнено "},{"order":11,"name":"nfilled","synonym":"Не заполнено"}],"label_positions":[{"order":0,"name":"inherit","synonym":"Наследовать","default":true},{"order":1,"name":"hide","synonym":"Скрыть"},{"order":2,"name":"left","synonym":"Лево"},{"order":3,"name":"right","synonym":"Право"},{"order":4,"name":"top","synonym":"Верх"},{"order":5,"name":"bottom","synonym":"Низ"}],"data_field_kinds":[{"order":0,"name":"field","synonym":"Поле ввода","default":true},{"order":1,"name":"input","synonym":"Простой текст"},{"order":2,"name":"text","synonym":"Многострочный текст"},{"order":3,"name":"label","synonym":"Надпись"},{"order":4,"name":"link","synonym":"Гиперссылка"},{"order":5,"name":"cascader","synonym":"Каскадер"},{"order":6,"name":"toggle","synonym":"Переключатель"},{"order":7,"name":"image","synonym":"Картинка"},{"order":8,"name":"type","synonym":"Тип значения"},{"order":9,"name":"path","synonym":"Путь к данным"},{"order":10,"name":"typed_field","synonym":"Поле связи по типу"},{"order":11,"name":"props","synonym":"Свойства объекта"},{"order":12,"name":"star","synonym":"Пометка"}],"standard_period":[{"order":0,"name":"custom","synonym":"Произвольный","default":true},{"order":1,"name":"yesterday","synonym":"Вчера"},{"order":2,"name":"today","synonym":"Сегодня"},{"order":3,"name":"tomorrow","synonym":"Завтра"},{"order":4,"name":"last7days","synonym":"Последние 7 дней"},{"order":5,"name":"last30days","synonym":"Последние 30 дней"},{"order":6,"name":"last3Month","synonym":"Последние 3 месяца"},{"order":7,"name":"last6Month","synonym":"Последние 6 месяцев"},{"order":8,"name":"lastWeek","synonym":"Прошлая неделя"},{"order":9,"name":"lastTendays","synonym":"Прошлая декада"},{"order":10,"name":"lastMonth","synonym":"Прошлый месяц"},{"order":11,"name":"lastQuarter","synonym":"Прошлый квартал"},{"order":12,"name":"lastHalfYear","synonym":"Прошлое полугодие"},{"order":13,"name":"lastYear","synonym":"Прошлый год"},{"order":14,"name":"next7Days","synonym":"Следующие 7 дней"},{"order":15,"name":"nextTendays","synonym":"Следующая декада"},{"order":16,"name":"nextWeek","synonym":"Следующая неделя"},{"order":17,"name":"nextMonth","synonym":"Следующий месяц"},{"order":18,"name":"nextQuarter","synonym":"Следующий квартал"},{"order":19,"name":"nextHalfYear","synonym":"Следующее полугодие"},{"order":20,"name":"nextYear","synonym":"Следующий год"},{"order":21,"name":"tillEndOfThisYear","synonym":"До конца этого года"},{"order":22,"name":"tillEndOfThisQuarter","synonym":"До конца этого квартала"},{"order":23,"name":"tillEndOfThisMonth","synonym":"До конца этого месяца"},{"order":24,"name":"tillEndOfThisHalfYear","synonym":"До конца этого полугодия"},{"order":25,"name":"tillEndOfThistendays","synonym":"До конца этой декады"},{"order":26,"name":"tillEndOfThisweek","synonym":"До конца этой недели"},{"order":27,"name":"fromBeginningOfThisYear","synonym":"С начала этого года"},{"order":28,"name":"fromBeginningOfThisQuarter","synonym":"С начала этого квартала"},{"order":29,"name":"fromBeginningOfThisMonth","synonym":"С начала этого месяца"},{"order":30,"name":"fromBeginningOfThisHalfYear","synonym":"С начала этого полугодия"},{"order":31,"name":"fromBeginningOfThisTendays","synonym":"С начала этой декады"},{"order":32,"name":"fromBeginningOfThisWeek","synonym":"С начала этой недели"},{"order":33,"name":"thisTenDays","synonym":"Эта декада"},{"order":34,"name":"thisWeek","synonym":"Эта неделя"},{"order":35,"name":"thisHalfYear","synonym":"Это полугодие"},{"order":36,"name":"thisYear","synonym":"Этот год"},{"order":37,"name":"thisQuarter","synonym":"Этот квартал"},{"order":38,"name":"thisMonth","synonym":"Этот месяц"}],"quick_access":[{"order":0,"name":"none","synonym":"Нет","default":true},{"order":1,"name":"toolbar","synonym":"Панель инструментов"},{"order":2,"name":"drawer","synonym":"Панель формы"}],"report_output":[{"order":0,"name":"grid","synonym":"Таблица","default":true},{"order":1,"name":"chart","synonym":"Диаграмма"},{"order":2,"name":"pivot","synonym":"Cводная таблица"},{"order":3,"name":"html","synonym":"Документ HTML"}],"mutual_contract_settlements":[{"order":0,"name":"ПоДоговоруВЦелом","synonym":"По договору в целом"},{"order":1,"name":"ПоЗаказам","synonym":"По заказам"},{"order":2,"name":"ПоСчетам","synonym":"По счетам"}],"contract_kinds":[{"order":0,"name":"СПоставщиком","synonym":"С поставщиком"},{"order":1,"name":"СПокупателем","synonym":"С покупателем"},{"order":2,"name":"СКомитентом","synonym":"С комитентом"},{"order":3,"name":"СКомиссионером","synonym":"С комиссионером"},{"order":4,"name":"Прочее","synonym":"Прочее"}],"text_aligns":[{"order":0,"name":"left","synonym":"Лево"},{"order":1,"name":"right","synonym":"Право"},{"order":2,"name":"center","synonym":"Центр"}],"gender":[{"order":0,"name":"Мужской","synonym":"Мужской"},{"order":1,"name":"Женский","synonym":"Женский"}],"parameters_keys_applying":[{"order":0,"name":"НаправлениеДоставки","synonym":"Направление доставки"},{"order":1,"name":"РабочийЦентр","synonym":"Рабочий центр"},{"order":2,"name":"Технология","synonym":"Технология"},{"order":3,"name":"Ценообразование","synonym":"Ценообразование"},{"order":4,"name":"ПараметрВыбора","synonym":"Параметр выбора"}],"vat_rates":[{"order":0,"name":"НДС18","synonym":"18%"},{"order":1,"name":"НДС18_118","synonym":"18% / 118%"},{"order":2,"name":"НДС10","synonym":"10%"},{"order":3,"name":"НДС10_110","synonym":"10% / 110%"},{"order":4,"name":"НДС0","synonym":"0%"},{"order":5,"name":"БезНДС","synonym":"Без НДС"},{"order":6,"name":"НДС20","synonym":"20%"},{"order":7,"name":"НДС20_120","synonym":"20% / 120%"}],"contact_information_types":[{"order":0,"name":"Адрес","synonym":"Адрес"},{"order":1,"name":"Телефон","synonym":"Телефон"},{"order":2,"name":"АдресЭлектроннойПочты","synonym":"Адрес электронной почты"},{"order":3,"name":"ВебСтраница","synonym":"Веб страница"},{"order":4,"name":"Факс","synonym":"Факс"},{"order":5,"name":"Другое","synonym":"Другое"},{"order":6,"name":"Skype","synonym":"Skype"}],"individual_legal":[{"order":0,"name":"ЮрЛицо","synonym":"Юрлицо"},{"order":1,"name":"ФизЛицо","synonym":"Физлицо"}]},"ireg":{"log":{"name":"log","note":"","synonym":"Журнал событий","dimensions":{"date":{"synonym":"Дата","tooltip":"Время события","type":{"types":["number"],"digits":15,"fraction":0}},"sequence":{"synonym":"Порядок","tooltip":"Порядок следования","type":{"types":["number"],"digits":6,"fraction":0}}},"resources":{"class":{"synonym":"Класс","tooltip":"Класс события","type":{"types":["string"],"str_len":100}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Текст события","type":{"types":["string"],"str_len":0}},"obj":{"synonym":"Объект","multiline_mode":true,"tooltip":"Объект, к которому относится событие","type":{"types":["string"],"str_len":0}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, в сеансе которого произошло событие","type":{"types":["string"],"str_len":100}}}},"log_view":{"name":"log_view","note":"","synonym":"Просмотр журнала событий","dimensions":{"key":{"synonym":"Ключ","tooltip":"Ключ события","type":{"types":["string"],"str_len":100}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, отметивыший событие, как просмотренное","type":{"types":["string"],"str_len":100}}}}},"cat":{"meta_objs":{"fields":{}},"meta_fields":{"fields":{}},"scheme_settings":{"name":"scheme_settings","synonym":"Настройки отчетов и списков","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"obj":{"synonym":"Объект","tooltip":"Имя класса метаданных","type":{"types":["string"],"str_len":250}},"user":{"synonym":"Пользователь","tooltip":"Если пусто - публичная настройка","type":{"types":["string"],"str_len":50}},"order":{"synonym":"Порядок","tooltip":"Порядок варианта","type":{"types":["number"],"digits":6,"fraction":0}},"query":{"synonym":"Запрос","tooltip":"Индекс CouchDB или текст SQL","type":{"types":["string"],"str_len":0}},"date_from":{"synonym":"Начало периода","tooltip":"","type":{"types":["date"],"date_part":"date"}},"date_till":{"synonym":"Конец периода","tooltip":"","type":{"types":["date"],"date_part":"date"}},"standard_period":{"synonym":"Стандартный период","tooltip":"Использование стандартного периода","type":{"types":["enm.standard_period"],"is_ref":true}},"formula":{"synonym":"Формула","tooltip":"Формула инициализации","type":{"types":["cat.formulas"],"is_ref":true}},"output":{"synonym":"Вывод","tooltip":"Вывод результата","type":{"types":["enm.report_output"],"is_ref":true}},"tag":{"synonym":"Дополнительные свойства","type":{"types":["string"],"str_len":0}}},"tabular_sections":{"fields":{"name":"fields","synonym":"Доступные поля","tooltip":"Состав, порядок и ширина колонок","fields":{"parent":{"synonym":"Родитель","tooltip":"Для плоского списка, родитель пустой","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"width":{"synonym":"Ширина","tooltip":"","type":{"types":["string"],"str_len":6}},"caption":{"synonym":"Заголовок","tooltip":"","type":{"types":["string"],"str_len":100}},"tooltip":{"synonym":"Подсказка","tooltip":"","type":{"types":["string"],"str_len":100}},"ctrl_type":{"synonym":"Тип","tooltip":"Тип элемента управления","type":{"types":["enm.data_field_kinds"],"is_ref":true}},"formatter":{"synonym":"Формат","tooltip":"Функция форматирования","type":{"types":["cat.formulas"],"is_ref":true}},"editor":{"synonym":"Редактор","tooltip":"Компонент редактирования","type":{"types":["cat.formulas"],"is_ref":true}}}},"sorting":{"name":"sorting","synonym":"Поля сортировки","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"direction":{"synonym":"Направление","tooltip":"","type":{"types":["enm.sort_directions"],"is_ref":true}}}},"dimensions":{"name":"dimensions","synonym":"Поля группировки","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}}}},"resources":{"name":"resources","synonym":"Ресурсы","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"formula":{"synonym":"Формула","tooltip":"По умолчанию - сумма","type":{"types":["cat.formulas"],"is_ref":true}}}},"selection":{"name":"selection","synonym":"Отбор","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"left_value":{"synonym":"Левое значение","tooltip":"Путь к данным","type":{"types":["string"],"str_len":255}},"left_value_type":{"synonym":"Тип слева","tooltip":"Тип значения слева","default":"path","type":{"types":["string"],"str_len":100}},"comparison_type":{"synonym":"Вид сравнения","tooltip":"","type":{"types":["enm.comparison_types"],"is_ref":true}},"right_value":{"synonym":"Правое значение","tooltip":"","type":{"types":["string"],"str_len":100}},"right_value_type":{"synonym":"Тип справа","tooltip":"Тип значения справа","default":"path","type":{"types":["string"],"str_len":100}}}},"params":{"name":"params","synonym":"Параметры","tooltip":"","fields":{"param":{"synonym":"Параметр","tooltip":"","type":{"types":["string"],"str_len":100}},"value_type":{"synonym":"Тип","tooltip":"Тип значения","type":{"types":["string"],"str_len":100}},"value":{"synonym":"Значение","tooltip":"Может иметь примитивный или ссылочный тип или массив","type":{"types":["string","number"],"str_len":0,"digits":15,"fraction":3,"date_part":"date"}},"quick_access":{"synonym":"Быстрый доступ","tooltip":"Размещать на нанели инструментов","type":{"types":["boolean"]}}}},"composition":{"name":"composition","synonym":"Структура","tooltip":"","fields":{"parent":{"synonym":"Родитель","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Элемент","tooltip":"Элемент структуры отчета","type":{"types":["string"],"str_len":50}},"kind":{"synonym":"Вид раздела отчета","tooltip":"список, таблица, группировка строк, группировка колонок","type":{"types":["string"],"str_len":50}},"definition":{"synonym":"Описание","tooltip":"Описание раздела структуры","type":{"types":["string"],"str_len":50}}}},"conditional_appearance":{"name":"conditional_appearance","synonym":"Условное оформление","tooltip":"","fields":{}}},"cachable":"doc"},"params_links":{"name":"СвязиПараметров","splitted":false,"synonym":"Связи параметров","illustration":"Подчиненные параметры","obj_presentation":"Связь параметров","list_presentation":"Связи параметров","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"master":{"synonym":"Ведущий","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.parameters_keys"],"is_ref":true}},"slave":{"synonym":"Ведомый","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"hide":{"synonym":"Скрыть ведомый","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"use_master":{"synonym":"Использование ведущих","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":1,"fraction":0}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users"],"is_ref":true}},"zone":{"synonym":"Область","multiline_mode":false,"tooltip":"Разделитель (префикс) данных","type":{"types":["number"],"digits":6,"fraction":0}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.params_links"],"is_ref":true}}},"tabular_sections":{"leadings":{"name":"Ведущие","synonym":"Ведущие","tooltip":"","fields":{"key":{"synonym":"Ключ","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.parameters_keys"],"is_ref":true}}}},"values":{"name":"Значения","synonym":"Значения","tooltip":"","fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["slave"]}],"choice_groups_elm":"elm","choice_type":{"path":["slave"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"forcibly":{"synonym":"Принудительно","multiline_mode":false,"tooltip":"Замещать установленное ранее значение при перевыборе ведущего параметра","type":{"types":["boolean"]}}}}},"cachable":"ram","read_only":true},"partner_bank_accounts":{"name":"БанковскиеСчетаКонтрагентов","splitted":false,"synonym":"Банковские счета","illustration":"Банковские счета сторонних контрагентов и физических лиц.","obj_presentation":"Банковский счет","list_presentation":"Банковские счета","input_by_string":["name","account_number"],"hierarchical":false,"has_owners":true,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"account_number":{"synonym":"Номер счета","multiline_mode":false,"tooltip":"Номер расчетного счета организации","mandatory":true,"type":{"types":["string"],"str_len":20}},"bank":{"synonym":"Банк","multiline_mode":false,"tooltip":"Банк, в котором открыт расчетный счет организации","choice_groups_elm":"elm","type":{"types":["cat.banks_qualifier"],"is_ref":true}},"settlements_bank":{"synonym":"Банк для расчетов","multiline_mode":false,"tooltip":"Банк, в случае непрямых расчетов","choice_groups_elm":"elm","type":{"types":["cat.banks_qualifier"],"is_ref":true}},"correspondent_text":{"synonym":"Текст корреспондента","multiline_mode":false,"tooltip":"Текст \"Плательщик\\Получатель\" в платежных документах","type":{"types":["string"],"str_len":250}},"appointments_text":{"synonym":"Текст назначения","multiline_mode":false,"tooltip":"Текст назначения платежа","type":{"types":["string"],"str_len":250}},"funds_currency":{"synonym":"Валюта","multiline_mode":false,"tooltip":"Валюта учета денежных средств","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.currencies"],"is_ref":true}},"bank_bic":{"synonym":"БИКБанка","multiline_mode":false,"tooltip":"БИК банка, в котором открыт счет","type":{"types":["string"],"str_len":9}},"bank_name":{"synonym":"Наименование банка","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":100}},"bank_correspondent_account":{"synonym":"Корр. счет банк","multiline_mode":false,"tooltip":"Корр.счет банка","type":{"types":["string"],"str_len":20}},"bank_city":{"synonym":"Город банка","multiline_mode":false,"tooltip":"Город банка","type":{"types":["string"],"str_len":50}},"bank_address":{"synonym":"Адрес банка","multiline_mode":false,"tooltip":"Адрес банка","type":{"types":["string"],"str_len":0}},"bank_phone_numbers":{"synonym":"Телефоны банка","multiline_mode":false,"tooltip":"Телефоны банка","type":{"types":["string"],"str_len":0}},"settlements_bank_bic":{"synonym":"БИК банка для расчетов","multiline_mode":false,"tooltip":"БИК банка, в случае непрямых расчетов","type":{"types":["string"],"str_len":9}},"settlements_bank_correspondent_account":{"synonym":"Корр. счет банка для расчетов","multiline_mode":false,"tooltip":"Корр.счет банка, в случае непрямых расчетов","type":{"types":["string"],"str_len":20}},"settlements_bank_city":{"synonym":"Город банка для расчетов","multiline_mode":false,"tooltip":"Город банка, в случае непрямых расчетов","type":{"types":["string"],"str_len":50}},"owner":{"synonym":"Контрагент","multiline_mode":false,"tooltip":"Контрагент или физическое лицо, являющиеся владельцем банковского счета","choice_params":[{"name":"is_folder","path":false}],"mandatory":true,"type":{"types":["cat.individuals","cat.partners"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"organization_bank_accounts":{"name":"БанковскиеСчетаОрганизаций","splitted":false,"synonym":"Банковские счета организаций","illustration":"Банковские счета собственных организаций. ","obj_presentation":"Банковский счет организации","list_presentation":"Банковские счета","input_by_string":["name","account_number"],"hierarchical":false,"has_owners":true,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"bank":{"synonym":"Банк","multiline_mode":false,"tooltip":"Банк, в котором открыт расчетный счет организации","choice_groups_elm":"elm","type":{"types":["cat.banks_qualifier"],"is_ref":true}},"bank_bic":{"synonym":"БИКБанка","multiline_mode":false,"tooltip":"БИК банка, в котором открыт счет","type":{"types":["string"],"str_len":9}},"funds_currency":{"synonym":"Валюта денежных средств","multiline_mode":false,"tooltip":"Валюта учета денежных средств","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.currencies"],"is_ref":true}},"account_number":{"synonym":"Номер счета","multiline_mode":false,"tooltip":"Номер расчетного счета организации","mandatory":true,"type":{"types":["string"],"str_len":20}},"settlements_bank":{"synonym":"Банк для расчетов","multiline_mode":false,"tooltip":"Банк, в случае непрямых расчетов","choice_groups_elm":"elm","type":{"types":["cat.banks_qualifier"],"is_ref":true}},"settlements_bank_bic":{"synonym":"БИК банка для расчетов","multiline_mode":false,"tooltip":"БИК банка, в случае непрямых расчетов","type":{"types":["string"],"str_len":9}},"department":{"synonym":"Подразделение","multiline_mode":false,"tooltip":"Подразделение, отвечающее за банковский счет","choice_groups_elm":"elm","type":{"types":["cat.divisions"],"is_ref":true}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"owner":{"synonym":"Организация","multiline_mode":false,"tooltip":"Организация, являющиеся владельцем банковского счета","choice_params":[{"name":"is_folder","path":false}],"mandatory":true,"type":{"types":["cat.organizations"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"banks_qualifier":{"name":"КлассификаторБанковРФ","splitted":false,"synonym":"Классификатор банков РФ","illustration":"","obj_presentation":"Банк","list_presentation":"Банки","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"correspondent_account":{"synonym":"Корр. счет","multiline_mode":false,"tooltip":"Корреспондентский счет банка","type":{"types":["string"],"str_len":20}},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город банка","type":{"types":["string"],"str_len":50}},"address":{"synonym":"Адрес","multiline_mode":false,"tooltip":"Адрес банка","type":{"types":["string"],"str_len":500}},"phone_numbers":{"synonym":"Телефоны","multiline_mode":false,"tooltip":"Телефоны банка","type":{"types":["string"],"str_len":250}},"activity_ceased":{"synonym":"Деятельность прекращена","multiline_mode":false,"tooltip":"Банк по каким-либо причинам прекратил свою деятельность","type":{"types":["boolean"]}},"swift":{"synonym":"СВИФТ БИК","multiline_mode":false,"tooltip":"Международный банковский идентификационный код (SWIFT BIC)","type":{"types":["string"],"str_len":11}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"Идентификационный номер налогоплательщика","type":{"types":["string"],"str_len":12}},"parent":{"synonym":"Группа банков","multiline_mode":false,"tooltip":"Группа банков, в которую входит данный банк","type":{"types":["cat.banks_qualifier"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"destinations":{"name":"НаборыДополнительныхРеквизитовИСведений","splitted":false,"synonym":"Наборы дополнительных реквизитов и сведений","illustration":"","obj_presentation":"Набор дополнительных реквизитов и сведений","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Входит в группу","multiline_mode":false,"tooltip":"Группа, к которой относится набор.","type":{"types":["cat.destinations"],"is_ref":true}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"","fields":{"property":{"synonym":"Дополнительный реквизит","multiline_mode":false,"tooltip":"Дополнительный реквизит этого набора","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"_deleted":{"synonym":"Пометка удаления","multiline_mode":false,"tooltip":"Устанавливается при исключении дополнительного реквизита из набора,\nчтобы можно было вернуть связь с уникальным дополнительным реквизитом.","type":{"types":["boolean"]}}}},"extra_properties":{"name":"ДополнительныеСведения","synonym":"Дополнительные сведения","tooltip":"","fields":{"property":{"synonym":"Дополнительное сведение","multiline_mode":false,"tooltip":"Дополнительное сведение этого набора","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"_deleted":{"synonym":"Пометка удаления","multiline_mode":false,"tooltip":"Устанавливается при исключении дополнительного сведения из набора,\nчтобы можно было вернуть связь с уникальным дополнительным сведением.","type":{"types":["boolean"]}}}}},"cachable":"ram","read_only":true},"formulas":{"name":"Формулы","splitted":false,"synonym":"Формулы","illustration":"Формулы пользователя, для выполнения при расчете спецификаций, модификаторы, вычисляемые свойства","obj_presentation":"Формула","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"Группа формул","mandatory":true,"type":{"types":["cat.formulas"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"choice_params":{"name":"ПараметрыВыбора","splitted":false,"synonym":"Параметры выбора","illustration":"Для привязки ключей параметров к метаданным","obj_presentation":"","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"key":{"synonym":"Ключ","multiline_mode":false,"tooltip":"Массив условий, добавляемых в параметр выбора","choice_params":[{"name":"applying","path":"ПараметрВыбора"}],"choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.parameters_keys"],"is_ref":true}},"runtime":{"synonym":"Динамический","multiline_mode":false,"tooltip":"Если истина, фильтр будет рассчитываться всякий раз, когда его запросит поле ввода или динсписок. Статический параметр рассчитывается на старте приложения","type":{"types":["boolean"]}},"condition_formula":{"synonym":"Формула условия","multiline_mode":false,"tooltip":"В этом поле можно указать дополнительное условие на языке javascript","choice_params":[{"name":"parent","path":"1cce6b82-73be-11e9-94bb-98d95b9a5346"},{"name":"disabled","path":false}],"choice_groups_elm":"elm","type":{"types":["cat.formulas"],"is_ref":true}},"field":{"synonym":"Поле реквизита","multiline_mode":false,"tooltip":"Ссылка или вложенное поле, на которое накладывается отбор","mandatory":true,"type":{"types":["string"],"str_len":255}}},"tabular_sections":{"composition":{"name":"Состав","synonym":"Состав","tooltip":"","fields":{"field":{"synonym":"Реквизит","multiline_mode":false,"tooltip":"Полное имя метаданных","mandatory":true,"type":{"types":["string"],"str_len":255}}}}},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"branches":{"name":"ИнтеграцияОтделыАбонентов","splitted":false,"synonym":"Отделы абонентов","illustration":"","obj_presentation":"Отдел абонента","list_presentation":"","input_by_string":["name","suffix"],"hierarchical":true,"has_owners":true,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"suffix":{"synonym":"Суффикс CouchDB","multiline_mode":false,"tooltip":"Для разделения данных в CouchDB","mandatory":true,"type":{"types":["string"],"str_len":4}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"Если указано, используется этот сервер, а не основной сервер абонента","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}},"back_server":{"synonym":"Обратный сервер","multiline_mode":false,"tooltip":"Если указано, этот сервер, для настройки репликации от сервера отдела к родителю","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}},"direct":{"synonym":"Direct","multiline_mode":false,"tooltip":"Для пользователя запрещен режим offline","type":{"types":["boolean"]}},"use":{"synonym":"Используется","multiline_mode":false,"tooltip":"Использовать данный отдел при создании баз и пользователей","type":{"types":["boolean"]}},"mode":{"synonym":"Режим","multiline_mode":false,"tooltip":"Режим репликации текущего отдела","type":{"types":["number"],"digits":1,"fraction":0}},"owner":{"synonym":"Абонент","multiline_mode":false,"tooltip":"Абонент, которому принадлежит отдел","mandatory":true,"type":{"types":["cat.abonents"],"is_ref":true}},"parent":{"synonym":"Ведущий отдел","multiline_mode":false,"tooltip":"Заполняется в случае иерархической репликации","choice_links":[{"name":["selection","owner"],"path":["owner"]}],"type":{"types":["cat.branches"],"is_ref":true}}},"tabular_sections":{"organizations":{"name":"Организации","synonym":"Организации","tooltip":"Организации, у которых дилер может заказывать продукцию и услуги","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.organizations"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"partners":{"name":"Контрагенты","synonym":"Контрагенты","tooltip":"Юридические лица дилера, от имени которых он оформляет заказы","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.partners"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"divisions":{"name":"Подразделения","synonym":"Подразделения","tooltip":"Подразделения, к данным которых, дилеру предоставлен доступ","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.divisions"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"price_types":{"name":"ТипыЦен","synonym":"Типы цен","tooltip":"Типы цен, привязанные к дилеру","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.nom_prices_types"],"is_ref":true}}}},"keys":{"name":"Ключи","synonym":"Ключи","tooltip":"Ключи параметров, привязанные к дилеру","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.parameters_keys"],"is_ref":true}}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","original_cachable":"doc"},"currencies":{"name":"Валюты","splitted":false,"synonym":"Валюты","illustration":"Валюты, используемые при расчетах","obj_presentation":"Валюта","list_presentation":"","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":3,"fields":{"name_full":{"synonym":"Наименование валюты","multiline_mode":false,"tooltip":"Полное наименование валюты","mandatory":true,"type":{"types":["string"],"str_len":50}},"extra_charge":{"synonym":"Наценка","multiline_mode":false,"tooltip":"Коэффициент, который применяется к курсу основной валюты для вычисления курса текущей валюты.","type":{"types":["number"],"digits":10,"fraction":2}},"main_currency":{"synonym":"Основная валюта","multiline_mode":false,"tooltip":"Валюта, на основании курса которой рассчитывается курс текущей валюты","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.currencies"],"is_ref":true}},"parameters_russian_recipe":{"synonym":"Параметры прописи на русском","multiline_mode":false,"tooltip":"Параметры прописи валюты на русском языке","type":{"types":["string"],"str_len":200}}},"tabular_sections":{},"cachable":"ram","read_only":true},"contact_information_kinds":{"name":"ВидыКонтактнойИнформации","splitted":false,"synonym":"Виды контактной информации","illustration":"","obj_presentation":"Вид контактной информации","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"mandatory_fields":{"synonym":"Обязательное заполнение","multiline_mode":false,"tooltip":"Вид контактной информации обязателен к заполнению","type":{"types":["boolean"]}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (адрес, телефон и т.д.)","choice_groups_elm":"elm","mandatory":true,"type":{"types":["enm.contact_information_types"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"Группа вида контактной информации","type":{"types":["cat.contact_information_kinds"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"property_values":{"name":"ЗначенияСвойствОбъектов","splitted":false,"synonym":"Дополнительные значения","illustration":"","obj_presentation":"Дополнительное значение","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":true,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"heft":{"synonym":"Весовой коэффициент","multiline_mode":false,"tooltip":"Относительный вес дополнительного значения (значимость).","type":{"types":["number"],"digits":10,"fraction":2}},"owner":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит или сведение.","mandatory":true,"type":{"types":["cch.properties"],"is_ref":true}},"parent":{"synonym":"Входит в группу","multiline_mode":false,"tooltip":"Группа дополнительных значений свойства.","choice_links":[{"name":["selection","owner"],"path":["owner"]}],"type":{"types":["cat.property_values"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"meta_ids":{"name":"ИдентификаторыОбъектовМетаданных","splitted":false,"synonym":"Идентификаторы объектов метаданных","illustration":"Идентификаторы объектов метаданных для использования в базе данных.","obj_presentation":"Идентификатор объекта метаданных","list_presentation":"","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"full_moniker":{"synonym":"Полное имя","multiline_mode":false,"tooltip":"Полное имя объекта метаданных","type":{"types":["string"],"str_len":430}},"parent":{"synonym":"Группа объектов","multiline_mode":false,"tooltip":"Группа объектов метаданных.","type":{"types":["cat.meta_ids"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"cashboxes":{"name":"Кассы","splitted":false,"synonym":"Кассы","illustration":"Список мест фактического хранения и движения наличных денежных средств предприятия. Кассы разделены по организациям и валютам денежных средств. ","obj_presentation":"Касса","list_presentation":"Кассы предприятия","input_by_string":["name","id"],"hierarchical":false,"has_owners":true,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"funds_currency":{"synonym":"Валюта денежных средств","multiline_mode":false,"tooltip":"Валюта учета денежных средств","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.currencies"],"is_ref":true}},"department":{"synonym":"Подразделение","multiline_mode":false,"tooltip":"Подразделение, отвечающее за кассу.","choice_groups_elm":"elm","type":{"types":["cat.divisions"],"is_ref":true}},"current_account":{"synonym":"Расчетный счет","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["owner"]}],"choice_groups_elm":"elm","type":{"types":["cat.organization_bank_accounts"],"is_ref":true}},"owner":{"synonym":"Организация","multiline_mode":false,"tooltip":"","choice_params":[{"name":"is_folder","path":false}],"mandatory":true,"type":{"types":["cat.organizations"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"partners":{"name":"Контрагенты","splitted":false,"synonym":"Контрагенты","illustration":"Список юридических или физических лиц клиентов (поставщиков, покупателей).","obj_presentation":"Контрагент","list_presentation":"Контрагенты","input_by_string":["name","id","inn"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"name_full":{"synonym":"Полное наименование","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"main_bank_account":{"synonym":"Основной банковский счет","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["ref"]}],"choice_groups_elm":"elm","type":{"types":["cat.partner_bank_accounts"],"is_ref":true}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":12}},"kpp":{"synonym":"КПП","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":9}},"ogrn":{"synonym":"ОГРН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":15}},"okpo":{"synonym":"Код по ОКПО","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"individual_legal":{"synonym":"Юр. / физ. лицо","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.individual_legal"],"is_ref":true}},"main_contract":{"synonym":"Основной договор контрагента","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["ref"]}],"choice_groups_elm":"elm","type":{"types":["cat.contracts"],"is_ref":true}},"identification_document":{"synonym":"Документ, удостоверяющий личность","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"buyer_main_manager":{"synonym":"Основной менеджер покупателя","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users"],"is_ref":true}},"is_buyer":{"synonym":"Покупатель","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"is_supplier":{"synonym":"Поставщик","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"primary_contact":{"synonym":"Основное контактное лицо","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.individuals"],"is_ref":true}},"parent":{"synonym":"Группа контрагентов","multiline_mode":false,"tooltip":"","type":{"types":["cat.partners"],"is_ref":true}}},"tabular_sections":{"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"139d49b9-5301-45f3-b851-4488420d7d15"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0},"hide":true},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100},"hide":true},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100},"hide":true},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100},"hide":true},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20},"hide":true},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20},"hide":true}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0},"hide":true}}}},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"organizations":{"name":"Организации","splitted":false,"synonym":"Организации","illustration":"","obj_presentation":"Организация","list_presentation":"","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"prefix":{"synonym":"Префикс","multiline_mode":false,"tooltip":"Используется при нумерации документов. В начало каждого номера документов данной организации добавляется символы префикса.","type":{"types":["string"],"str_len":3}},"individual_legal":{"synonym":"Юр. / физ. лицо","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.individual_legal"],"is_ref":true}},"individual_entrepreneur":{"synonym":"Индивидуальный предприниматель","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.individuals"],"is_ref":true}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":12}},"kpp":{"synonym":"КПП","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":9}},"ogrn":{"synonym":"ОГРН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":15}},"main_bank_account":{"synonym":"Основной банковский счет","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["ref"]}],"choice_groups_elm":"elm","type":{"types":["cat.organization_bank_accounts"],"is_ref":true}},"main_cashbox":{"synonym":"Основноая касса","multiline_mode":false,"tooltip":"","choice_links":[{"name":["selection","owner"],"path":["ref"]}],"choice_groups_elm":"elm","type":{"types":["cat.cashboxes"],"is_ref":true}},"certificate_series_number":{"synonym":"Серия и номер свидетельства о постановке на учет","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":25}},"certificate_date_issue":{"synonym":"Дата выдачи свидетельства о постановке на учет","multiline_mode":false,"tooltip":"","type":{"types":["date"],"date_part":"date"}},"certificate_authority_name":{"synonym":"Наименование налогового органа, выдавшего свидетельство","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":254}},"certificate_authority_code":{"synonym":"Код налогового органа, выдавшего свидетельство","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":4}},"chief":{"synonym":"Руководитель","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.individuals"],"is_ref":true}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.organizations"],"is_ref":true}}},"tabular_sections":{"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"Хранение контактной информации (адреса, веб-страницы, номера телефонов и др.)","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"c34c4e9d-c7c5-42bb-8def-93ecfe7b1977"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0},"hide":true},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100},"hide":true},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50},"hide":true},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100},"hide":true},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100},"hide":true},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20},"hide":true},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20},"hide":true},"list_view":{"synonym":"Вид для списка","multiline_mode":false,"tooltip":"Вид контактной информации для списка","choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"act_from":{"synonym":"Действует С","multiline_mode":false,"tooltip":"Дата актуальности контактная информация","type":{"types":["date"],"date_part":"date"}}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Набор реквизитов, состав которого определяется компанией.","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0},"hide":true}}}},"cachable":"ram","read_only":true},"inserts":{"name":"Вставки","splitted":false,"synonym":"Вставки","illustration":"Армирование, пленки, вставки - дополнение спецификации, которое зависит от одного элемента","obj_presentation":"Вставка","list_presentation":"Вставки","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{},"tabular_sections":{},"cachable":"ram","read_only":true},"parameters_keys":{"name":"КлючиПараметров","splitted":false,"synonym":"Ключи параметров","illustration":"Списки пар {Параметр:Значение} для фильтрации в подсистемах формирования спецификаций, планировании и ценообразовании\n","obj_presentation":"Ключ параметров","list_presentation":"Ключи параметров","input_by_string":["name"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"priority":{"synonym":"Приоритет","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":6,"fraction":0}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания","type":{"types":["number"],"digits":5,"fraction":0}},"applying":{"synonym":"Применение","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.parameters_keys_applying"],"is_ref":true}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"editor":{"synonym":"Редактор","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.users"],"is_ref":true}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.parameters_keys"],"is_ref":true}}},"tabular_sections":{"params":{"name":"Параметры","synonym":"Параметры","tooltip":"","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cch.properties"],"is_ref":true}},"comparison_type":{"synonym":"Вид сравнения","multiline_mode":false,"tooltip":"","choice_params":[{"name":"ref","path":["gt","gte","lt","lte","eq","ne","in","nin","inh","ninh"]}],"choice_groups_elm":"elm","type":{"types":["enm.comparison_types"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_links":[{"name":["comparison_type"],"path":["params","comparison_type"]},{"name":["selection","owner"],"path":["params","property"]},{"name":["txt_row"],"path":["params","txt_row"]}],"choice_type":{"path":["params","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового реквизита либо сериализация списочного значения","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"production_params":{"name":"пзПараметрыПродукции","splitted":false,"synonym":"Параметры продукции","illustration":"Настройки системы профилей и фурнитуры","obj_presentation":"Система","list_presentation":"Параметры продукции","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"","type":{"types":["cat.production_params"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"delivery_areas":{"name":"РайоныДоставки","splitted":false,"synonym":"Районы доставки","illustration":"","obj_presentation":"Район доставки","list_presentation":"Районы доставки","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{},"tabular_sections":{},"cachable":"ram","read_only":true},"furns":{"name":"пзФурнитура","splitted":false,"synonym":"Фурнитура","illustration":"Описывает ограничения и правила формирования спецификаций фурнитуры","obj_presentation":"Фурнитура","list_presentation":"Фурнитура","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"","type":{"types":["cat.furns"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","read_only":true},"divisions":{"name":"Подразделения","splitted":false,"synonym":"Подразделения","illustration":"Перечень подразделений предприятия","obj_presentation":"Подразделение","list_presentation":"Подразделения","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":false,"main_presentation_name":true,"code_length":9,"fields":{"main_project":{"synonym":"Основной проект","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.projects"],"is_ref":true}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания (служебный)","type":{"types":["number"],"digits":6,"fraction":0}},"parent":{"synonym":"Входит в подразделение","multiline_mode":false,"tooltip":"","type":{"types":["cat.divisions"],"is_ref":true}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Набор реквизитов, состав которого определяется компанией.","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"users":{"name":"Пользователи","splitted":false,"synonym":"Пользователи","illustration":"","obj_presentation":"Пользователь","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"invalid":{"synonym":"Недействителен","multiline_mode":false,"tooltip":"Пользователь больше не работает в программе, но сведения о нем сохранены.\nНедействительные пользователи скрываются из всех списков\nпри выборе или подборе в документах и других местах программы.","type":{"types":["boolean"]}},"department":{"synonym":"Подразделение","multiline_mode":false,"tooltip":"Подразделение, в котором работает пользователь","choice_groups_elm":"elm","type":{"types":["cat.divisions"],"is_ref":true}},"individual_person":{"synonym":"Физическое лицо","multiline_mode":false,"tooltip":"Физическое лицо, с которым связан пользователь","choice_groups_elm":"elm","type":{"types":["cat.individuals"],"is_ref":true}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":0}},"ancillary":{"synonym":"Служебный","multiline_mode":false,"tooltip":"Неразделенный или разделенный служебный пользователь, права к которому устанавливаются непосредственно и программно.","type":{"types":["boolean"]}},"user_ib_uid":{"synonym":"Идентификатор пользователя ИБ","multiline_mode":false,"tooltip":"Уникальный идентификатор пользователя информационной базы, с которым сопоставлен этот элемент справочника.","choice_groups_elm":"elm","type":{"types":["string"],"str_len":36,"str_fix":true}},"id":{"synonym":"Логин","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":50}},"latin":{"synonym":"latin","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":100}},"prefix":{"synonym":"Префикс нумерации","multiline_mode":false,"tooltip":"Префикс номеров документов текущего пользователя","mandatory":true,"type":{"types":["string"],"str_len":2}},"branch":{"synonym":"Отдел","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.branches"],"is_ref":true}},"push_only":{"synonym":"Только push","multiline_mode":false,"tooltip":"Для пользователя установлен режим push-only (изменения мигрируют в одну сторону - от пользователя на сервер)","type":{"types":["boolean"]}},"roles":{"synonym":"Роли Couchdb","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":1000}},"suffix":{"synonym":"Суффикс CouchDB","multiline_mode":false,"tooltip":"Для разделения данных в CouchDB","mandatory":true,"type":{"types":["string"],"str_len":4}},"direct":{"synonym":"Direct","multiline_mode":false,"tooltip":"Для пользователя запрещен режим offline","type":{"types":["boolean"]}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}},"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"Хранение контактной информации (адреса, веб-страницы, номера телефонов и др.)","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"8cbaa30d-faab-45ad-880e-84f8b421f448"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0}},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100}},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100}},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100}},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20}},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20}},"list_view":{"synonym":"Вид для списка","multiline_mode":false,"tooltip":"Вид контактной информации для списка","choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}}}},"acl_objs":{"name":"ОбъектыДоступа","synonym":"Объекты доступа","tooltip":"","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","type":{"types":["cat.individuals","cat.users","cat.nom_prices_types","cat.divisions","cat.parameters_keys","cat.partners","cat.organizations","cat.abonents","cat.cashboxes","cat.meta_ids","cat.stores"],"is_ref":true}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"ids":{"name":"Идентификаторы","synonym":"Идентификаторы авторизации","tooltip":"","fields":{"identifier":{"synonym":"Идентификатор","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":255}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}}}},"subscribers":{"name":"Абоненты","synonym":"Абоненты","tooltip":"","fields":{"abonent":{"synonym":"Абонент","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.abonents"],"is_ref":true}}}}},"cachable":"ram"},"stores":{"name":"Склады","splitted":false,"synonym":"Склады (места хранения)","illustration":"Сведения о местах хранения товаров (складах), их структуре и физических лицах, назначенных материально ответственными (МОЛ) за тот или иной склад","obj_presentation":"Склад","list_presentation":"Склады","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"department":{"synonym":"Подразделение","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.divisions"],"is_ref":true}},"parent":{"synonym":"Группа","multiline_mode":false,"tooltip":"","type":{"types":["cat.stores"],"is_ref":true}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Набор реквизитов, состав которого определяется компанией.","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"nom_prices_types":{"name":"ТипыЦенНоменклатуры","splitted":false,"synonym":"Типы цен номенклатуры","illustration":"Перечень типов отпускных цен предприятия","obj_presentation":"Тип цен номенклатуры","list_presentation":"Типы цен номенклатуры","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"price_currency":{"synonym":"Валюта цены по умолчанию","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.currencies"],"is_ref":true}},"discount_percent":{"synonym":"Процент скидки или наценки по умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":5,"fraction":2}},"vat_price_included":{"synonym":"Цена включает НДС","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"rounding_order":{"synonym":"Порядок округления","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"rounding_in_a_big_way":{"synonym":"Округлять в большую сторону","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}}},"tabular_sections":{},"cachable":"ram","original_cachable":"doc_ram","read_only":true},"individuals":{"name":"ФизическиеЛица","splitted":false,"synonym":"Физические лица","illustration":"","obj_presentation":"","list_presentation":"","input_by_string":["name","id"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":10,"fields":{"birth_date":{"synonym":"Дата рождения","multiline_mode":false,"tooltip":"","type":{"types":["date"],"date_part":"date"}},"inn":{"synonym":"ИНН","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":12}},"imns_code":{"synonym":"Код ИФНС","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":4}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"pfr_number":{"synonym":"Страховой номер ПФР","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":14}},"sex":{"synonym":"Пол","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["enm.gender"],"is_ref":true}},"birth_place":{"synonym":"Место рождения","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":240}},"Фамилия":{"synonym":"Фамилия","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"Имя":{"synonym":"Имя","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"Отчество":{"synonym":"Отчество","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"ФамилияРП":{"synonym":"Фамилия (родительный падеж)","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"ИмяРП":{"synonym":"Имя (родительный падеж)","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"ОтчествоРП":{"synonym":"Отчество (родительный падеж)","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"ОснованиеРП":{"synonym":"Основание (родительный падеж)","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"ДолжностьРП":{"synonym":"Должность (родительный падеж)","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"Должность":{"synonym":"Должность","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"captured":{"synonym":"Захвачен","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"zones":{"synonym":"Абоненты-получатели","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":0}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.individuals"],"is_ref":true}}},"tabular_sections":{"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"Хранение контактной информации (адреса, веб-страницы, номера телефонов и др.)","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"822f19bc-09ab-4913-b283-b5461382a75d"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0}},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100}},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100}},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100}},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20}},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20}},"list_view":{"synonym":"Вид для списка","multiline_mode":false,"tooltip":"Вид контактной информации для списка","choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}}}}},"cachable":"ram","read_only":true},"servers":{"name":"ИнтеграцияСерверы","splitted":false,"synonym":"Серверы CouchDB","illustration":"","obj_presentation":"Сервер","list_presentation":"Серверы CouchDB","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"http":{"synonym":"HTTP","multiline_mode":false,"tooltip":"Адрес сервиса интеграции metadata.js или сервера авторизации oAuth","mandatory":true,"type":{"types":["string"],"str_len":255}},"username":{"synonym":"Login (consumerKey)","multiline_mode":false,"tooltip":"Login администратора CouchDB или consumerKey сервера oAuth","mandatory":true,"type":{"types":["string"],"str_len":100}},"password":{"synonym":"Password (consumerSecret)","multiline_mode":false,"tooltip":"Пароль администратора CouchDB или consumerSecret сервера oAuth","mandatory":true,"type":{"types":["string"],"str_len":100}},"callbackurl":{"synonym":"Обратный url oAuth","multiline_mode":false,"tooltip":"oAuth callback URL","type":{"types":["string"],"str_len":255}}},"tabular_sections":{},"cachable":"meta"},"abonents":{"name":"ИнтеграцияАбоненты","splitted":false,"synonym":"Абоненты","illustration":"","obj_presentation":"Абонент","list_presentation":"Абоненты","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":6,"fields":{"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"Основной сервер абонента (отделы абонента могут использовать другие серверы)","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}},"repl_mango":{"synonym":"RMango","multiline_mode":false,"tooltip":"Использовать mango-селетор в фильтре репликатора","type":{"types":["boolean"]}},"repl_templates":{"synonym":"RTemplate","multiline_mode":false,"tooltip":"Использовать отдельную базу шаблонов","type":{"types":["boolean"]}}},"tabular_sections":{"acl_objs":{"name":"ОбъектыДоступа","synonym":"Базовые объекты","tooltip":"Базовые объекты к регистрации: системы профилей, фурнитуры, организации, контрагенты","fields":{"obj":{"synonym":"Объект","multiline_mode":false,"tooltip":"","type":{"types":["doc.work_centers_performance","cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","doc.credit_card_order","cat.nom_units","doc.planning_event","cch.predefined_elmnts","cat.currencies","doc.nom_prices_setup","cat.choice_params","cat.characteristics","cat.projects","cat.individuals","cat.users","cat.insert_bind","cat.partner_bank_accounts","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","doc.debit_bank_order","doc.registers_correction","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","cat.banks_qualifier","doc.credit_cash_order","doc.selling","cat.nom_prices_types","cat.organization_bank_accounts","cat.divisions","cat.destinations","cat.parameters_keys","doc.purchase","cat.contact_information_kinds","cat.params_links","cat.partners","cat.nonstandard_attributes","doc.debit_cash_order","cat.nom_kinds","cat.organizations","cat.countries","cat.units","doc.work_centers_task","cat.abonents","cat.servers","doc.calc_order","cat.branches","doc.credit_bank_order","cat.cashboxes","cat.nom","cat.cnns","cat.furns","cat.cash_flow_articles","cat.meta_ids","cat.contracts","cat.stores","cch.properties","cat.clrs"],"is_ref":true}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":255}}}},"ex_bases":{"name":"ДополнительныеБазы","synonym":"Дополнительные базы","tooltip":"Шаблоны, логгер и т.д. - копируем в _security пользователей из ram","fields":{"name":{"synonym":"Наименование","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":25}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}}}}},"cachable":"meta"},"delivery_directions":{"name":"НаправленияДоставки","splitted":false,"synonym":"Направления доставки","illustration":"Объединяет районы, территории или подразделения продаж","obj_presentation":"Направление доставки","list_presentation":"Направления доставки","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{},"tabular_sections":{},"cachable":"ram","original_cachable":"doc","read_only":true}},"dp":{"scheme_settings":{"name":"scheme_settings","synonym":"Варианты настроек","fields":{"scheme":{"synonym":"Текущая настройка","tooltip":"Текущий вариант настроек","mandatory":true,"type":{"types":["cat.scheme_settings"],"is_ref":true}}}}},"doc":{"calc_order":{"name":"Расчет","splitted":false,"synonym":"Расчет-заказ","illustration":"Аналог заказа покупателя типовых конфигураций.\nСодержит инструменты для формирования спецификаций и подготовки данных производства и диспетчеризации","obj_presentation":"Расчет-заказ","list_presentation":"Расчеты-заказы","input_by_string":["number_doc","number_internal"],"hierarchical":false,"has_owners":false,"group_hierarchy":false,"main_presentation_name":false,"code_length":11,"fields":{},"tabular_sections":{},"cachable":"ram","original_cachable":"doc","read_only":true}},"areg":{},"rep":{},"cch":{"predefined_elmnts":{"name":"ПредопределенныеЭлементы","splitted":false,"synonym":"Константы и списки","illustration":"Хранит значения настроек и параметров подсистем","obj_presentation":"Значение настроек","list_presentation":"","input_by_string":["name","synonym"],"hierarchical":true,"has_owners":false,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cat.production_params","cat.currencies","cat.color_price_groups","cat.formulas","boolean","cat.nom_prices_types","cat.divisions","enm.elm_types","cat.parameters_keys","string","cat.nom_kinds","date","number","enm.planning_detailing","doc.calc_order","cat.nom","cat.furns","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}},"definition":{"synonym":"Описание","multiline_mode":true,"tooltip":"","type":{"types":["string"],"str_len":0}},"synonym":{"synonym":"Синоним","multiline_mode":false,"tooltip":"Синоним предопределенного элемента","mandatory":true,"type":{"types":["string"],"str_len":50}},"list":{"synonym":"Список","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":1,"fraction":0}},"zone":{"synonym":"Область","multiline_mode":false,"tooltip":"Разделитель (префикс) данных","type":{"types":["number"],"digits":6,"fraction":0}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cch.predefined_elmnts"],"is_ref":true}},"type":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.production_params","cat.currencies","cat.color_price_groups","cat.formulas","boolean","cat.nom_prices_types","cat.divisions","enm.elm_types","cat.parameters_keys","string","cat.nom_kinds","date","number","enm.planning_detailing","doc.calc_order","cat.nom","cat.furns","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}}},"tabular_sections":{"elmnts":{"name":"Элементы","synonym":"Элементы","tooltip":"","fields":{"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cat.production_params","cat.currencies","cat.color_price_groups","cat.formulas","boolean","cat.nom_prices_types","cat.divisions","enm.elm_types","cat.parameters_keys","string","cat.nom_kinds","date","number","enm.planning_detailing","doc.calc_order","cat.nom","cat.furns","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}},"elm":{"synonym":"Элемент","multiline_mode":false,"tooltip":"","type":{"types":["cat.production_params","cat.currencies","cat.color_price_groups","cat.formulas","boolean","cat.nom_prices_types","cat.divisions","enm.elm_types","cat.parameters_keys","string","cat.nom_kinds","date","number","enm.planning_detailing","doc.calc_order","cat.nom","cat.furns","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date","digits":8,"fraction":1}}}}},"cachable":"ram","read_only":true},"properties":{"name":"ДополнительныеРеквизитыИСведения","splitted":false,"synonym":"Дополнительные реквизиты и сведения","illustration":"","obj_presentation":"Дополнительный реквизит / сведение","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"shown":{"synonym":"Виден","multiline_mode":false,"tooltip":"Настройка видимости дополнительного реквизита","type":{"types":["boolean"]}},"sorting_field":{"synonym":"Порядок","multiline_mode":false,"tooltip":"Используется для упорядочивания (служебный)","type":{"types":["number"],"digits":6,"fraction":0}},"extra_values_owner":{"synonym":"Владелец дополнительных значений","multiline_mode":false,"tooltip":"Свойство-образец, с которым у этого свойства одинаковый список дополнительных значений","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"available":{"synonym":"Доступен","multiline_mode":false,"tooltip":"Настройка доступности дополнительного реквизита","type":{"types":["boolean"]}},"mandatory":{"synonym":"Заполнять обязательно","multiline_mode":false,"tooltip":"Настройка проверки заполненности дополнительного реквизита","type":{"types":["boolean"]}},"include_to_name":{"synonym":"Включать в наименование","multiline_mode":false,"tooltip":"Добавлять значение параметра в наименование продукции","type":{"types":["boolean"]}},"list":{"synonym":"Список","multiline_mode":false,"tooltip":"Реквизит подсистемы интеграции metadata.js - реализует функциональность списка опций","type":{"types":["number"],"digits":1,"fraction":0}},"caption":{"synonym":"Наименование","multiline_mode":false,"tooltip":"Краткое представление свойства, которое\nвыводится в формах редактирования его значения","mandatory":true,"type":{"types":["string"],"str_len":75}},"note":{"synonym":"Комментарий","multiline_mode":false,"tooltip":"Поясняет назначение свойства","type":{"types":["string"],"str_len":0}},"destination":{"synonym":"Набор свойств","multiline_mode":false,"tooltip":"Набор свойств, которому принадлежит уникальное свойство. Если не задан, значит свойство общее.","choice_groups_elm":"elm","type":{"types":["cat.destinations"],"is_ref":true}},"tooltip":{"synonym":"Подсказка","multiline_mode":false,"tooltip":"Показывается пользователю при редактировании свойства в форме объекта","type":{"types":["string"],"str_len":0}},"is_extra_property":{"synonym":"Это дополнительное сведение","multiline_mode":false,"tooltip":"Свойство является дополнительным сведением, а не дополнительным реквизитом","type":{"types":["boolean"]}},"include_to_description":{"synonym":"Включать в описание","multiline_mode":false,"tooltip":"Добавлять имя и значение параметра в строку описания продукции","type":{"types":["boolean"]}},"calculated":{"synonym":"Вычисляемый","multiline_mode":false,"tooltip":"Если параметр вычисляемый, здесь указываем формулу","choice_groups_elm":"elm","type":{"types":["cat.formulas"],"is_ref":true}},"showcalc":{"synonym":"Показывать вычисляемый","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"type":{"synonym":"","multiline_mode":false,"tooltip":"Типы значения, которое можно ввести при заполнении свойства.","mandatory":true,"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.price_groups","cat.currencies","enm.open_directions","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.planning_detailing","cat.abonents","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}}},"tabular_sections":{},"cachable":"ram","read_only":true}},"cacc":{},"bp":{},"tsk":{},"syns_1с":["arcCCW","CH","RADIUS","Абонент","Абоненты","Автор","Адрес","АдресБанка","АдресДоставки","АдресЭП","Аксессуар","Активная","Арт1Стеклопакет","Арт1ТолькоВертикальный","Арт2Стеклопакет","Арт2ТолькоВертикальный","Артикул","Атрибуты","БазоваяЕдиницаИзмерения","Банк","БанкДляРасчетов","Банки","БанковскиеСчета","БанковскиеСчетаКонтрагентов","БанковскиеСчетаОрганизаций","БанковскийСчет","БизнесПроцесс","БИКБанка","БИКБанкаДляРасчетов","Булево","Валюта","ВалютаВзаиморасчетов","ВалютаДенежныхСредств","ВалютаДокумента","ВалютаЦены","Валюты","ВариантАтрибутов","ВариантПереноса","ВариантПути","ВариантСмещения","ВариантУкорочения","ВариантыАтрибутовВставок","ВариантыКрепленияИмпостов","ВариантыПереносаОпераций","ВариантыСмещений","ВариантыУкорочений","ВариантыУравнивания","ВводПоСтроке","ВедениеВзаиморасчетов","ВедениеВзаиморасчетовПоДоговорам","Ведомый","ВедущаяПродукция","ВедущаяФормула","Ведущие","Ведущий","ВедущийМенеджер","ВедущийЭлемент","ВерсияДанных","Вес","Вид","ВидДвижения","ВидДляСписка","ВидДоговора","Виден","ВидЗатрат","ВидНоменклатуры","ВидОперации","ВидРабот","ВидРабочегоЦентра","ВидСкидкиНаценки","ВидСравнения","ВидСчета","ВидыДвиженийПриходРасход","ВидыДоговоровКонтрагентов","ВидыЗатрат","ВидыКонтактнойИнформации","ВидыНоменклатуры","ВидыПолейФормы","ВидыРабочихЦентров","ВидыТранспортныхСредств","Визуализация","ВключатьВНаименование","ВключатьВОписание","Владелец","ВладелецДополнительныхЗначений","Владельцы","ВнутренниеЗаказы","ВремяИзменения","ВремяНачала","ВремяОкончания","ВремяСобытия","Всего","Вставка","Вставки","ВходящееИсходящееСобытие","ВыборГруппИЭлементов","Выполнена","ВыпуклаяДуга","ВыравниваниеТекста","Высота","ВысотаМакс","ВысотаМин","ВысотаРучки","ВысотаРучкиМакс","ВысотаРучкиМин","ВысотаРучкиФиксирована","Глубина","Город","ГородБанка","ГородБанкаДляРасчетов","Готовность","ГрафикРаботы","Группировка","ГруппыФинансовогоУчетаНоменклатуры","ДаНет","Дата","ДатаДоставки","ДатаИзменения","ДатаНачала","ДатаОкончания","ДатаРождения","ДатаСобытия","Действие","ДействуетС","ДеловаяОбрезь","ДержатьРезервБезОплатыОграниченноеВремя","ДетализацияПланирования","ДеятельностьПрекращена","Длина","ДлинаКода","ДлинаМакс","ДлинаМин","ДлинаНомера","ДлинаПроема","ДнейДоГотовности","ДнейОтГотовности","ДниНедели","ДоговорКонтрагента","ДоговорыКонтрагентов","Документ.Расчет","ДокументУдостоверяющийЛичность","Долгота","ДоменноеИмяСервера","Доп","ДополнительныеБазы","ДополнительныеРеквизиты","ДополнительныеРеквизитыИСведения","ДополнительныеСведения","ДопускаютсяНезамкнутыеКонтуры","ДопустимаяСуммаЗадолженности","ДопустимоеЧислоДнейЗадолженности","Доступен","ЕдиницаИзмерения","ЕдиницаПоКлассификатору","ЕдиницаХраненияОстатков","ЕдиницыИзмерения","Завершен","Завершение","ЗависимостиДополнительныхРеквизитов","Заголовок","Заказ","Заказной","ЗаказПокупателя","ЗаказПоставщику","Закрыт","Закрыть","Запасы","Заполнения","ЗаполнятьОбязательно","Запуск","Значение","ЗначениеЗаполнения","Значения","ЗначенияПолей","ЗначенияПолейАдреса","ЗначенияСвойствОбъектов","ЗначенияСвойствОбъектовИерархия","Идентификатор","ИдентификаторПользователяИБ","Идентификаторы","ИдентификаторыОбъектовМетаданных","Иерархический","ИерархияГруппИЭлементов","Изделие","ИзОбрези","ИмяПредопределенныхДанных","Инд","Индекс","ИндивидуальныйПредприниматель","ИНН","ИнтеграцияАбоненты","ИнтеграцияВидыСравнений","ИнтеграцияКешСсылок","ИнтеграцияНастройкиОтчетовИСписков","ИнтеграцияОтделыАбонентов","ИнтеграцияСерверы","ИнтеграцияСостоянияТранспорта","ИнтеграцияТипВыгрузки","ИнтеграцияТипКеширования","ИнтеграцияТипСвёртки","Исполнители","Исполнитель","ИспользованиеВедущих","ИспользованиеОбрези","ИтогСебестоимость","Календари","КалендариGoogle","Календарь","Камеры","Касса","Кассы","КатегорииЗаказов","Категория","КлассификаторБанковРФ","КлассификаторЕдиницИзмерения","КлиентДилера","Ключ","Ключи","КлючиПараметров","КМарж","КМаржВнутр","КМаржМин","Код","КодАльфа2","КодАльфа3","КодИМНС","КодПоОКПО","КодЦветаДляСтанка","Количество","КоличествоСторон","Комментарий","КонечныйОстаток","Конструкции","Конструкция","КонтактнаяИнформация","КонтактныеЛица","КонтактныеЛицаКонтрагентов","Контрагент","Контрагенты","КонтролироватьСуммуЗадолженности","КонтролироватьЧислоДнейЗадолженности","КонцевыеКрепления","Координата","Координаты","КоординатыЗаполнений","КорректировкаРегистров","КоррСчет","КоррСчетБанка","КоррСчетБанкаДляРасчетов","Коэффициент","КоэффициентПотерь","КПП","Кратность","КратностьВзаиморасчетов","КрепитсяШтульп","КреплениеИмпостов","КреплениеШтульпа","Кривой","Курс","КурсВзаиморасчетов","КурсыВалют","ЛеваяПравая","Листовые","Маржа","Марка","Масса","МассаМакс","МассаМин","МассаСтворкиМакс","МассаСтворкиМин","Материал","МатериалОперация","Материалы","МеждународноеСокращение","Менеджер","МестоРождения","МногострочныйРежим","МожноПоворачивать","Москитка","Москитки","МощностиРЦ","Мощность","Набор","НаборСвойств","НаборСвойствНоменклатура","НаборСвойствХарактеристика","НаборФурнитуры","НаборыДополнительныхРеквизитовИСведений","НазначениеЦветовойГруппы","НазначенияЦветовыхГрупп","Наименование","НаименованиеБанка","НаименованиеПолное","НаименованиеСокращенное","НалогообложениеНДС","Направление","НаправлениеОткрывания","НаправленияДоставки","НаправленияСортировки","НаПроем","НарядРЦ","НастройкиОткрывания","Наценка","НаценкаВнешн","НачальныйОстаток","Недействителен","НеполноеОткрывание","Нестандарт","Номенклатура","Номенклатура1","Номенклатура2","НоменклатурнаяГруппа","Номер","НомерВнутр","НомерКлиента","НомерКонтура","НомерОтдела","НомерСтроки","НомерСчета","НомерТелефона","НомерТелефонаБезКодов","ОбластиДоступаGoogle","Область","ОбратныйСервер","Обрезь","Объект","ОбъектДоступа","ОбъектыДоступа","Объем","ОбязательноеЗаполнение","ОграниченияСпецификации","ОГРН","ОкруглятьВБольшуюСторону","ОкруглятьКоличество","Описание","ОплатаОтПокупателяПлатежнойКартой","Организации","Организация","Ориентация","ОриентацияЭлемента","ОсновнаяВалюта","ОсновнаяСтатьяДвиженияДенежныхСредств","ОсновноаяКасса","ОсновноеКонтактноеЛицо","ОсновноеПредставлениеИмя","ОсновнойБанковскийСчет","ОсновнойДоговорКонтрагента","ОсновнойМенеджерПокупателя","ОсновнойПроект","ОснЦвет","ОсьПоворота","Отбор","Ответственный","Отдел","ОтражатьВБухгалтерскомУчете","ОтражатьВНалоговомУчете","Отступы","Пара","Параметр","Параметры","ПараметрыВыбора","ПараметрыИзделия","ПараметрыОтбора","ПараметрыПрописиНаРусском","ПараметрыФурнитуры","ПарныйРаскрой","Партия","Период","ПериодыСмены","пзВизуализацияЭлементов","пзМаржинальныеКоэффициентыИСкидки","пзПараметрыПродукции","пзСоединения","пзФурнитура","пзЦвета","Планирование","ПлатежноеПоручениеВходящее","ПлатежноеПоручениеИсходящее","ПлатежныйКалендарь","Плотность","Площадь","ПлощадьМакс","ПлощадьМин","ПлощадьППМ","Поворачивать","Поворот","ПоДоговоруВЦелом","Подразделение","ПодразделениеПроизводства","Подразделения","Подсказка","Подчиненый","ПоЗаказам","ПоКонтуру","Покупатель","Пол","ПолноеИмя","Положение","ПоложениеСтворокПоИмпостам","ПоложениеЭлемента","ПоложенияЗаголовка","Получатель","ПолФизическихЛиц","Пользователи","Пользователь","ПометкаУдаления","ПорогОкругления","Порядок","ПорядокОкругления","Поставщик","ПоступлениеТоваровУслуг","ПоСчетам","Потребность","ПоУмолчанию","Пояснение","Предоплата","ПредопределенныеЭлементы","Предопределенный","Представление","ПредставлениеИдентификатора","ПредставлениеОбъекта","ПредставлениеСписка","Префикс","Привязки","ПривязкиВставок","ПризнакиНестандартов","Применение","ПримененияКлючейПараметров","Принудительно","Приоритет","Припуск","Приход","ПриходныйКассовыйОрдер","ПриязкаКоординат","Проведен","Продукция","Проект","Проекты","Происхождение","Пропорции","Процент","ПроцентПредоплаты","ПроцентСкидкиНаценки","ПроцентСкидкиНаценкиВнутр","Прочее","Прямоугольный","ПутьSVG","РаботаетВремяНачала","РаботаетВремяОкончания","Работники","Работы","РабочиеЦентры","Разделитель","Размер","Размер_B","РазмерМакс","РазмерМин","РазмерФальца","РазмерФурнПаза","РазныеЦвета","Район","РайоныДоставки","Раскладка","Раскрой","Расход","РасходныйКассовыйОрдер","Расценка","Расчет","РасчетныйСчет","РасчетыСКонтрагентами","РасширенныйРежим","РасшифровкаПлатежа","РеализацияТоваровУслуг","Регион","Реквизит","РеквизитДопУпорядочивания","Реквизиты","Родитель","Роли","Руководитель","РучкаНаСтороне","СвидетельствоДатаВыдачи","СвидетельствоКодОргана","СвидетельствоНаименованиеОргана","СвидетельствоСерияНомер","СВИФТБИК","Свойство","Связи","СвязиПараметров","СвязиПараметровВыбора","СвязьПоТипу","Сделка","Себестоимость","Сервер","Синоним","Система","СистемыПрофилей","СистемыФурнитуры","Скидка","СкидкаВнешн","СкидкиНаценки","Склад","Склады","СКомиссионером","СКомитентом","Скрыть","Сложный","Служебный","Смена","Смены","Смещение","Событие","СобытиеПланирования","Содержание","Соедин","СоединяемыеЭлементы","Соответствие","СоответствиеЦветов","СортировкаВЛистеКомплектации","Состав","Состояние","СостояниеТранспорта","СостоянияЗаданий","СостоянияЗаказовКлиентов","Сотрудник","Сотрудники","Спецификации","Спецификация","СпецификацияЗаполнений","Список","СПокупателем","СпособРасчетаКоличества","СпособРасчетаУгла","СпособУстановкиКурса","СпособыРасчетаКоличества","СпособыРасчетаУгла","СпособыУстановкиКурсаВалюты","СпособыУстановкиСпецификации","СПоставщиком","СрокДействия","Ссылка","СтавкаНДС","СтавкиНДС","СтандартнаяВысотаРучки","СтандартныйПериод","Старт","Стартован","СтатусыЗаказов","СтатьиДвиженияДенежныхСредств","СтатьиЗатрат","СтатьяДвиженияДенежныхСредств","СтатьяЗатрат","Створка","СтворкиВРазныхПлоскостях","Стоимость","Сторона","Сторона1","Сторона2","СторонаСоединения","СторонаЭлемента","СтороныСоединений","Страна","СтраныМира","СтраховойНомерПФР","стрНомер","Строка","СтрокаПодключения","СтруктурнаяЕдиница","Сумма","СуммаАвтоматическойСкидки","СуммаВзаиморасчетов","СуммаВключаетНДС","СуммаВнутр","СуммаДокумента","СуммаКонечныйОстаток","СуммаНачальныйОстаток","СуммаНДС","СуммаПриход","СуммаРасход","СуммаСНаценкой","СуммаУпр","Суффикс","СчетУчета","ТаблицаРегистров","ТабличнаяЧасть","ТабличныеЧасти","ТекстКорреспондента","ТекстНазначения","ТекстоваяСтрока","Телефон","Телефоны","ТелефоныБанка","Тип","ТипВставки","ТипВставкиСтеклопакета","ТипДеления","ТипДенежныхСредств","ТипИсходногоДокумента","ТипНоменклатуры","ТиповойБлок","ТиповыеБлоки","ТипОптимизации","ТипОткрывания","ТипСоединения","ТипСчета","ТипЦен","ТипЦенВнутр","ТипЦенПрайс","ТипЦенСебестоимость","ТипыВставок","ТипыВставокСтеклопакета","ТипыДеленияРаскладки","ТипыДенежныхСредств","ТипыКонтактнойИнформации","ТипыНалогообложенияНДС","ТипыНоменклатуры","ТипыОптимизацийРаскроя","ТипыОткрывания","ТипыРазмерныхЛиний","ТипыСобытий","ТипыСоединений","ТипыСтрокВЗаказ","ТипыСтруктурныхЕдиниц","ТипыСчетов","ТипыЦен","ТипыЦенНоменклатуры","ТипыЭлементов","ТипЭлемента","Товары","Толщина","ТолщинаМакс","ТолщинаМин","ТолькоДляПрямыхПрофилей","ТолькоДляЦенообразования","ТочкаМаршрута","ТранспортныеСредства","УголКГоризонту","УголКГоризонтуМакс","УголКГоризонтуМин","УголМакс","УголМин","УголРеза1","УголРеза2","УголШага","УдлинениеАрки","Узел1","Узел2","Укорочение","УкорочениеПоКонтуру","Упаковка","Управленческий","Условие","УсловныхИзделий","Услуги","УстанавливатьСпецификацию","УстановкаЦенНоменклатуры","Уточнение","УточнятьРайонГеокодером","УчитыватьНДС","Фаза","ФазыПланирования","ФизическиеЛица","ФизическоеЛицо","Финиш","Формула","ФормулаВнешн","ФормулаВнутр","ФормулаПродажа","ФормулаРасчетаКурса","ФормулаУсловия","Формулы","Фурнитура","ФурнитураЦвет","Характеристика","ХарактеристикаАксессуаров","ХарактеристикаНоменклатуры","ХарактеристикаПродукции","ХарактеристикиНоменклатуры","Хлыст","Цвет","Цвет1","Цвет2","ЦветRAL","Цвета","ЦветВРисовалке","ЦветИзнутри","Цветной","ЦветоваяГруппа","ЦветоЦеновыеГруппы","ЦветСнаружи","Цена","ЦенаВключаетНДС","ЦенаВнутр","ЦеноваяГруппа","ЦеновыеГруппы","Центрировать","ЦеныНоменклатуры","Число","ЧислоДнейРезерваБезОплаты","Шаблон","Шаг","Ширина","ШиринаПилы","Широта","Шкала","Штуки","ШтульпБезимпСоед","Экземпляр","Элемент","Элемент1","Элемент2","Элементы","Эскиз","ЭтоАксессуар","ЭтоГруппа","ЭтоДополнительноеСведение","ЭтоНабор","ЭтоОсновнойЭлемент","ЭтоРаздвижка","ЭтоСоединение","ЭтоСтрокаЗаказа","ЭтоСтрокаНабора","ЭтоСтрокаОперации","ЭтоСтрокаОсновнойСпецификации","ЭтоСтрокаСочетанияНоменклатур","ЭтоТехоперация","ЭтоУслуга","ЮрЛицо","ЮрФизЛицо","Ячейка","Ячейки"],"syns_js":["arc_ccw","changed","arc_r","abonent","subscribers","author","address","bank_address","shipping_address","email_address","accessory","active","art1glass","art1vert","art2glass","art2vert","article","attributes","base_unit","bank","settlements_bank","banks","bank_accounts","partner_bank_accounts","organization_bank_accounts","bank_account","buisness_process","bank_bic","settlements_bank_bic","boolean","currency","settlements_currency","funds_currency","doc_currency","price_currency","currencies","attrs_option","transfer_option","path_kind","offset_option","contraction_option","inset_attrs_options","impost_mount_options","transfer_operations_options","offset_options","contraction_options","align_types","input_by_string","mutual_settlements","mutual_contract_settlements","slave","leading_product","leading_formula","leadings","master","leading_manager","leading_elm","data_version","heft","kind","record_kind","list_view","contract_kind","shown","cost_kind","nom_kind","transactions_kind","work_kind","work_center_kind","charges_discounts_kind","comparison_type","account_kind","debit_credit_kinds","contract_kinds","costs_kinds","contact_information_kinds","nom_kinds","data_field_kinds","work_center_kinds","motor_vehicle_kinds","visualization","include_to_name","include_to_description","owner","extra_values_owner","owners","internal_orders","change_time","begin_time","end_time","event_time","altogether","inset","inserts","inbound_outbound","choice_groups_elm","completed","arc_available","text_aligns","height","hmax","hmin","h_ruch","handle_height_max","handle_height_min","fix_ruch","depth","city","bank_city","settlements_bank_city","readiness","worker_schedule","grouping","nom_groups","yes_no","date","shipping_date","change_date","start_date","expiration_date","birth_date","event_date","action","act_from","biz_cuts","check_days_without_pay","planning_detailing","activity_ceased","len","code_length","lmax","lmin","number_doc_len","aperture_len","days_to_execution","days_from_execution","week_days","contract","contracts","Документ.итРасчет","identification_document","longitude","server_domain_name","dop","ex_bases","extra_fields","properties","extra_properties","allow_open_cnn","allowable_debts_amount","allowable_debts_days","available","unit","qualifier_unit","storage_unit","nom_units","finished","completion","extra_fields_dependencies","caption","invoice","made_to_order","buyers_order","purchase_order","closed","close","inventories","glasses","mandatory","launch","value","fill_value","values","values_fields","address_fields","property_values","property_values_hierarchy","identifier","user_ib_uid","ids","meta_ids","hierarchical","group_hierarchy","product","from_cut","predefined_name","icounter","ind","individual_entrepreneur","inn","abonents","comparison_types","integration_links_cache","scheme_settings","branches","servers","obj_delivery_states","unload_type","caching_type","reduce_type","executors","executor","use_master","use_cut","first_cost_total","calendars","calendars_google","calendar","coffer","cashbox","cashboxes","order_categories","category","banks_qualifier","units","client_of_dealer","key","keys","parameters_keys","marginality","marginality_internal","marginality_min","id","alpha2","alpha3","imns_code","okpo","machine_tools_clr","quantity","side_count","note","final_balance","constructions","cnstr","contact_information","contact_persons","contact_persons_partners","partner","partners","check_debts_amount","check_debts_days","end_mount","coordinate","coordinates","glass_coordinates","registers_correction","correspondent_account","bank_correspondent_account","settlements_bank_correspondent_account","coefficient","loss_factor","kpp","multiplicity","settlements_multiplicity","shtulp_fix_here","impost_fixation","shtulp_fixation","crooked","course","settlements_course","currency_courses","left_right","is_sandwich","margin","brand","weight","mmax","mmin","flap_weight_max","flap_weight_min","material","material_operation","materials","international_short","manager","birth_place","multiline_mode","can_rotate","mskt","mosquito","work_centers_performance","power","set","destination","dnom","dcharacteristic","furn_set","destinations","color_price_group_destination","color_price_group_destinations","name","bank_name","name_full","name_short","vat","direction","open_directions","delivery_directions","sort_directions","on_aperture","work_centers_task","open_tunes","extra_charge","extra_charge_external","initial_balance","invalid","partial_opening","nonstandard","nom","nom1","nom2","nom_group","number_doc","number_internal","client_number","contour_number","number_division","row","account_number","phone_number","phone_without_codes","google_access_areas","area","back_server","cuts","obj","acl_obj","acl_objs","volume","mandatory_fields","specification_restrictions","ogrn","rounding_in_a_big_way","rounding_quantity","definition","credit_card_order","organizations","organization","orientation","orientations","main_currency","main_cash_flow_article","main_cashbox","primary_contact","main_presentation_name","main_bank_account","main_contract","buyer_main_manager","main_project","default_clr","rotation_axis","selection","responsible","branch","accounting_reflect","tax_accounting_reflect","offsets","pair","param","params","choice_params","product_params","selection_params","parameters_russian_recipe","furn_params","double_cut","part","period","work_shift_periodes","elm_visualization","margin_coefficients","production_params","cnns","furns","clrs","planning","debit_bank_order","credit_bank_order","calendar_payments","density","s","smax","smin","coloration_area","rotate","rotated","by_entire_contract","department","department_manufactory","divisions","tooltip","has_owners","by_orders","by_contour","is_buyer","sex","full_moniker","pos","flap_pos_by_impost","positions","label_positions","recipient","gender","users","user","_deleted","rounding_threshold","sorting","rounding_order","is_supplier","purchase","by_invoices","demand","by_default","illustration","prepayment","predefined_elmnts","predefined","presentation","identifier_presentation","obj_presentation","list_presentation","prefix","bindings","insert_bind","nonstandard_attributes","applying","parameters_keys_applying","forcibly","priority","overmeasure","debit","debit_cash_order","bind_coordinates","posted","production","project","projects","origin","proportions","rate","prepayment_percent","discount_percent","discount_percent_internal","others","is_rectangular","svg_path","work_begin_time","work_end_time","workers","jobs","work_centers","delimiter","sz","sizeb","sz_max","sz_min","sizefaltz","sizefurn","varclr","delivery_area","delivery_areas","lay","cutting","credit","credit_cash_order","pricing","calc_order","current_account","invoice_payments","extended_mode","payment_details","selling","region","field","sorting_field","fields","parent","roles","chief","handle_side","certificate_date_issue","certificate_authority_code","certificate_authority_name","certificate_series_number","swift","property","links","params_links","choice_links","choice_type","trans","first_cost","server","synonym","sys","sys_profile","sys_furn","discount","discount_external","charges_discounts","warehouse","stores","with_commission_agent","with_committent","hide","difficult","ancillary","work_shift","work_shifts","offset","event","planning_event","content","cnn","cnn_elmnts","conformity","clr_conformity","complete_list_sorting","composition","state","obj_delivery_state","task_states","buyers_order_states","employee","staff","specifications","specification","glass_specification","list","with_buyer","count_calc_method","angle_calc_method","course_installation_method","count_calculating_ways","angle_calculating_ways","course_installation_methods","specification_installation_methods","with_supplier","validity","ref","vat_rate","vat_rates","handle_height_base","standard_period","start","started","invoice_conditions","cash_flow_articles","cost_items","cash_flow_article","cost_item","flap","var_layers","cost","side","sd1","sd2","cnn_side","elm_side","cnn_sides","country","countries","pfr_number","number_str","string","connection_str","organizational_unit","amount","discount_amount_automatic","amount_mutual","vat_included","amount_internal","doc_amount","amount_final_balance","amount_initial_balance","vat_amount","amount_debit","amount_credit","amount_marged","amount_operation","suffix","account_accounting","registers_table","tabular_section","tabular_sections","correspondent_text","appointments_text","txt_row","phone","phone_numbers","bank_phone_numbers","type","insert_type","insert_glass_type","split_type","cash_flow_type","original_doc_type","nom_type","base_block","base_blocks","cutting_optimization_type","open_type","cnn_type","account_type","price_type","price_type_internal","price_type_sale","price_type_first_cost","inserts_types","inserts_glass_types","lay_split_types","cash_flow_types","contact_information_types","vat_types","nom_types","cutting_optimization_types","open_types","sz_line_types","event_types","cnn_types","specification_order_row_types","structural_unit_types","account_types","price_types","nom_prices_types","elm_types","elm_type","goods","thickness","tmax","tmin","for_direct_profile_only","for_pricing_only","buisness_process_point","transport_means","angle_hor","ahmax","ahmin","amax","amin","alp1","alp2","step_angle","arc_elongation","node1","node2","contraction","contraction_by_contour","packing","managerial","condition","condition_products","services","set_specification","nom_prices_setup","specify","specify_area_by_geocoder","vat_consider","phase","planning_phases","individuals","individual_person","finish","formula","external_formula","internal_formula","sale_formula","course_calc_formula","condition_formula","formulas","furn","clr_furn","characteristic","accessory_characteristic","nom_characteristic","product_characteristic","characteristics","stick","clr","clr1","clr2","ral","colors","clr_str","clr_in","colored","clr_group","color_price_groups","clr_out","price","vat_price_included","price_internal","price_group","price_groups","do_center","nom_prices","number","days_without_pay","template","step","width","saw_width","latitude","scale","is_pieces","shtulp_available","specimen","elm","elm1","elm2","elmnts","outline","is_accessory","is_folder","is_extra_property","is_set","is_main_elm","is_sliding","is_cnn","is_order_row","is_set_row","is_procedure_row","is_main_specification_row","is_nom_combinations_row","is_procedure","is_service","legal_person","individual_legal","cell","cells"]});
  
  (function(){
  const {MetaEventEmitter,EnumManager,CatManager,DocManager,DataProcessorsManager,ChartOfCharacteristicManager,ChartOfAccountManager,
    InfoRegManager,AccumRegManager,BusinessProcessManager,TaskManager,CatObj,DocObj,TabularSectionRow,DataProcessorObj,
    RegisterRow,BusinessProcessObj,TaskObj} = $p.constructor.classes;
    
  const _define = Object.defineProperties;

$p.enm.create('accumulation_record_type');
$p.enm.create('sort_directions');
$p.enm.create('comparison_types');
$p.enm.create('label_positions');
$p.enm.create('data_field_kinds');
$p.enm.create('standard_period');
$p.enm.create('quick_access');
$p.enm.create('report_output');
$p.enm.create('mutual_contract_settlements');
$p.enm.create('contract_kinds');
$p.enm.create('text_aligns');
$p.enm.create('gender');
$p.enm.create('parameters_keys_applying');
$p.enm.create('vat_rates');
$p.enm.create('contact_information_types');
$p.enm.create('individual_legal');

/**
* ### План видов характеристик ПредопределенныеЭлементы
* Хранит значения настроек и параметров подсистем
* @class CchPredefined_elmnts
* @extends CatObj
* @constructor 
*/
class CchPredefined_elmnts extends CatObj{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get definition(){return this._getter('definition')}
set definition(v){this._setter('definition',v)}
get synonym(){return this._getter('synonym')}
set synonym(v){this._setter('synonym',v)}
get list(){return this._getter('list')}
set list(v){this._setter('list',v)}
get zone(){return this._getter('zone')}
set zone(v){this._setter('zone',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
        set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
get elmnts(){return this._getter_ts('elmnts')}
set elmnts(v){this._setter_ts('elmnts',v)}
}
$p.CchPredefined_elmnts = CchPredefined_elmnts;
class CchPredefined_elmntsElmntsRow extends TabularSectionRow{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get elm(){return this._getter('elm')}
set elm(v){this._setter('elm',v)}
}
$p.CchPredefined_elmntsElmntsRow = CchPredefined_elmntsElmntsRow;
$p.cch.create('predefined_elmnts');

/**
* ### План видов характеристик ДополнительныеРеквизитыИСведения
* Дополнительные реквизиты и сведения
* @class CchProperties
* @extends CatObj
* @constructor 
*/
class CchProperties extends CatObj{
get shown(){return this._getter('shown')}
set shown(v){this._setter('shown',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get extra_values_owner(){return this._getter('extra_values_owner')}
set extra_values_owner(v){this._setter('extra_values_owner',v)}
get available(){return this._getter('available')}
set available(v){this._setter('available',v)}
get mandatory(){return this._getter('mandatory')}
set mandatory(v){this._setter('mandatory',v)}
get include_to_name(){return this._getter('include_to_name')}
set include_to_name(v){this._setter('include_to_name',v)}
get list(){return this._getter('list')}
set list(v){this._setter('list',v)}
get caption(){return this._getter('caption')}
set caption(v){this._setter('caption',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get destination(){return this._getter('destination')}
set destination(v){this._setter('destination',v)}
get tooltip(){return this._getter('tooltip')}
set tooltip(v){this._setter('tooltip',v)}
get is_extra_property(){return this._getter('is_extra_property')}
set is_extra_property(v){this._setter('is_extra_property',v)}
get include_to_description(){return this._getter('include_to_description')}
set include_to_description(v){this._setter('include_to_description',v)}
get calculated(){return this._getter('calculated')}
set calculated(v){this._setter('calculated',v)}
get showcalc(){return this._getter('showcalc')}
set showcalc(v){this._setter('showcalc',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
        set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
}
$p.CchProperties = CchProperties;
$p.cch.create('properties');

/**
* ### Справочник СвязиПараметров
* Подчиненные параметры
* @class CatParams_links
* @extends CatObj
* @constructor 
*/
class CatParams_links extends CatObj{
get master(){return this._getter('master')}
set master(v){this._setter('master',v)}
get slave(){return this._getter('slave')}
set slave(v){this._setter('slave',v)}
get hide(){return this._getter('hide')}
set hide(v){this._setter('hide',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get use_master(){return this._getter('use_master')}
set use_master(v){this._setter('use_master',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get zone(){return this._getter('zone')}
set zone(v){this._setter('zone',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get leadings(){return this._getter_ts('leadings')}
set leadings(v){this._setter_ts('leadings',v)}
get values(){return this._getter_ts('values')}
set values(v){this._setter_ts('values',v)}
}
$p.CatParams_links = CatParams_links;
class CatParams_linksLeadingsRow extends TabularSectionRow{
get key(){return this._getter('key')}
set key(v){this._setter('key',v)}
}
$p.CatParams_linksLeadingsRow = CatParams_linksLeadingsRow;
class CatParams_linksValuesRow extends TabularSectionRow{
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
get forcibly(){return this._getter('forcibly')}
set forcibly(v){this._setter('forcibly',v)}
}
$p.CatParams_linksValuesRow = CatParams_linksValuesRow;
$p.cat.create('params_links');

/**
* ### Справочник БанковскиеСчетаКонтрагентов
* Банковские счета сторонних контрагентов и физических лиц.
* @class CatPartner_bank_accounts
* @extends CatObj
* @constructor 
*/
class CatPartner_bank_accounts extends CatObj{
get account_number(){return this._getter('account_number')}
set account_number(v){this._setter('account_number',v)}
get bank(){return this._getter('bank')}
set bank(v){this._setter('bank',v)}
get settlements_bank(){return this._getter('settlements_bank')}
set settlements_bank(v){this._setter('settlements_bank',v)}
get correspondent_text(){return this._getter('correspondent_text')}
set correspondent_text(v){this._setter('correspondent_text',v)}
get appointments_text(){return this._getter('appointments_text')}
set appointments_text(v){this._setter('appointments_text',v)}
get funds_currency(){return this._getter('funds_currency')}
set funds_currency(v){this._setter('funds_currency',v)}
get bank_bic(){return this._getter('bank_bic')}
set bank_bic(v){this._setter('bank_bic',v)}
get bank_name(){return this._getter('bank_name')}
set bank_name(v){this._setter('bank_name',v)}
get bank_correspondent_account(){return this._getter('bank_correspondent_account')}
set bank_correspondent_account(v){this._setter('bank_correspondent_account',v)}
get bank_city(){return this._getter('bank_city')}
set bank_city(v){this._setter('bank_city',v)}
get bank_address(){return this._getter('bank_address')}
set bank_address(v){this._setter('bank_address',v)}
get bank_phone_numbers(){return this._getter('bank_phone_numbers')}
set bank_phone_numbers(v){this._setter('bank_phone_numbers',v)}
get settlements_bank_bic(){return this._getter('settlements_bank_bic')}
set settlements_bank_bic(v){this._setter('settlements_bank_bic',v)}
get settlements_bank_correspondent_account(){return this._getter('settlements_bank_correspondent_account')}
set settlements_bank_correspondent_account(v){this._setter('settlements_bank_correspondent_account',v)}
get settlements_bank_city(){return this._getter('settlements_bank_city')}
set settlements_bank_city(v){this._setter('settlements_bank_city',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
}
$p.CatPartner_bank_accounts = CatPartner_bank_accounts;
$p.cat.create('partner_bank_accounts');

/**
* ### Справочник БанковскиеСчетаОрганизаций
* Банковские счета собственных организаций. 
* @class CatOrganization_bank_accounts
* @extends CatObj
* @constructor 
*/
class CatOrganization_bank_accounts extends CatObj{
get bank(){return this._getter('bank')}
set bank(v){this._setter('bank',v)}
get bank_bic(){return this._getter('bank_bic')}
set bank_bic(v){this._setter('bank_bic',v)}
get funds_currency(){return this._getter('funds_currency')}
set funds_currency(v){this._setter('funds_currency',v)}
get account_number(){return this._getter('account_number')}
set account_number(v){this._setter('account_number',v)}
get settlements_bank(){return this._getter('settlements_bank')}
set settlements_bank(v){this._setter('settlements_bank',v)}
get settlements_bank_bic(){return this._getter('settlements_bank_bic')}
set settlements_bank_bic(v){this._setter('settlements_bank_bic',v)}
get department(){return this._getter('department')}
set department(v){this._setter('department',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
}
$p.CatOrganization_bank_accounts = CatOrganization_bank_accounts;
$p.cat.create('organization_bank_accounts');

/**
* ### Справочник КлассификаторБанковРФ
* Классификатор банков РФ
* @class CatBanks_qualifier
* @extends CatObj
* @constructor 
*/
class CatBanks_qualifier extends CatObj{
get correspondent_account(){return this._getter('correspondent_account')}
set correspondent_account(v){this._setter('correspondent_account',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get address(){return this._getter('address')}
set address(v){this._setter('address',v)}
get phone_numbers(){return this._getter('phone_numbers')}
set phone_numbers(v){this._setter('phone_numbers',v)}
get activity_ceased(){return this._getter('activity_ceased')}
set activity_ceased(v){this._setter('activity_ceased',v)}
get swift(){return this._getter('swift')}
set swift(v){this._setter('swift',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatBanks_qualifier = CatBanks_qualifier;
$p.cat.create('banks_qualifier');

/**
* ### Справочник НаборыДополнительныхРеквизитовИСведений
* Наборы дополнительных реквизитов и сведений
* @class CatDestinations
* @extends CatObj
* @constructor 
*/
class CatDestinations extends CatObj{
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
get extra_properties(){return this._getter_ts('extra_properties')}
set extra_properties(v){this._setter_ts('extra_properties',v)}
}
$p.CatDestinations = CatDestinations;
class CatDestinationsExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get _deleted(){return this._getter('_deleted')}
set _deleted(v){this._setter('_deleted',v)}
}
$p.CatDestinationsExtra_fieldsRow = CatDestinationsExtra_fieldsRow;
class CatDestinationsExtra_propertiesRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get _deleted(){return this._getter('_deleted')}
set _deleted(v){this._setter('_deleted',v)}
}
$p.CatDestinationsExtra_propertiesRow = CatDestinationsExtra_propertiesRow;
$p.cat.create('destinations');

/**
* ### Справочник Формулы
* Формулы пользователя, для выполнения при расчете спецификаций, модификаторы, вычисляемые свойства
* @class CatFormulas
* @extends CatObj
* @constructor 
*/
class CatFormulas extends CatObj{
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatFormulas = CatFormulas;
$p.cat.create('formulas');

/**
* ### Справочник ПараметрыВыбора
* Для привязки ключей параметров к метаданным
* @class CatChoice_params
* @extends CatObj
* @constructor 
*/
class CatChoice_params extends CatObj{
get key(){return this._getter('key')}
set key(v){this._setter('key',v)}
get runtime(){return this._getter('runtime')}
set runtime(v){this._setter('runtime',v)}
get condition_formula(){return this._getter('condition_formula')}
set condition_formula(v){this._setter('condition_formula',v)}
get field(){return this._getter('field')}
set field(v){this._setter('field',v)}
get composition(){return this._getter_ts('composition')}
set composition(v){this._setter_ts('composition',v)}
}
$p.CatChoice_params = CatChoice_params;
class CatChoice_paramsCompositionRow extends TabularSectionRow{
get field(){return this._getter('field')}
set field(v){this._setter('field',v)}
}
$p.CatChoice_paramsCompositionRow = CatChoice_paramsCompositionRow;
$p.cat.create('choice_params');

/**
* ### Справочник ИнтеграцияОтделыАбонентов
* Отделы абонентов
* @class CatBranches
* @extends CatObj
* @constructor 
*/
class CatBranches extends CatObj{
get suffix(){return this._getter('suffix')}
set suffix(v){this._setter('suffix',v)}
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
get back_server(){return this._getter('back_server')}
set back_server(v){this._setter('back_server',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
get use(){return this._getter('use')}
set use(v){this._setter('use',v)}
get mode(){return this._getter('mode')}
set mode(v){this._setter('mode',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get organizations(){return this._getter_ts('organizations')}
set organizations(v){this._setter_ts('organizations',v)}
get partners(){return this._getter_ts('partners')}
set partners(v){this._setter_ts('partners',v)}
get divisions(){return this._getter_ts('divisions')}
set divisions(v){this._setter_ts('divisions',v)}
get price_types(){return this._getter_ts('price_types')}
set price_types(v){this._setter_ts('price_types',v)}
get keys(){return this._getter_ts('keys')}
set keys(v){this._setter_ts('keys',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}



  db(cachable) {
    const {adapter, _owner: {$p}} = this._manager;
  }}
$p.CatBranches = CatBranches;
class CatBranchesOrganizationsRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
}
$p.CatBranchesOrganizationsRow = CatBranchesOrganizationsRow;
class CatBranchesPartnersRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
}
$p.CatBranchesPartnersRow = CatBranchesPartnersRow;
class CatBranchesDivisionsRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
}
$p.CatBranchesDivisionsRow = CatBranchesDivisionsRow;
class CatBranchesPrice_typesRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
}
$p.CatBranchesPrice_typesRow = CatBranchesPrice_typesRow;
class CatBranchesKeysRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
}
$p.CatBranchesKeysRow = CatBranchesKeysRow;
class CatBranchesExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatBranchesExtra_fieldsRow = CatBranchesExtra_fieldsRow;
$p.cat.create('branches');

/**
* ### Справочник Валюты
* Валюты, используемые при расчетах
* @class CatCurrencies
* @extends CatObj
* @constructor 
*/
class CatCurrencies extends CatObj{
get name_full(){return this._getter('name_full')}
set name_full(v){this._setter('name_full',v)}
get extra_charge(){return this._getter('extra_charge')}
set extra_charge(v){this._setter('extra_charge',v)}
get main_currency(){return this._getter('main_currency')}
set main_currency(v){this._setter('main_currency',v)}
get parameters_russian_recipe(){return this._getter('parameters_russian_recipe')}
set parameters_russian_recipe(v){this._setter('parameters_russian_recipe',v)}
}
$p.CatCurrencies = CatCurrencies;
$p.cat.create('currencies');

/**
* ### Справочник ВидыКонтактнойИнформации
* Виды контактной информации
* @class CatContact_information_kinds
* @extends CatObj
* @constructor 
*/
class CatContact_information_kinds extends CatObj{
get mandatory_fields(){return this._getter('mandatory_fields')}
set mandatory_fields(v){this._setter('mandatory_fields',v)}
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatContact_information_kinds = CatContact_information_kinds;
$p.cat.create('contact_information_kinds');

/**
* ### Справочник ЗначенияСвойствОбъектов
* Дополнительные значения
* @class CatProperty_values
* @extends CatObj
* @constructor 
*/
class CatProperty_values extends CatObj{
get heft(){return this._getter('heft')}
set heft(v){this._setter('heft',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatProperty_values = CatProperty_values;
$p.cat.create('property_values');

/**
* ### Справочник ИдентификаторыОбъектовМетаданных
* Идентификаторы объектов метаданных для использования в базе данных.
* @class CatMeta_ids
* @extends CatObj
* @constructor 
*/
class CatMeta_ids extends CatObj{
get full_moniker(){return this._getter('full_moniker')}
set full_moniker(v){this._setter('full_moniker',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatMeta_ids = CatMeta_ids;
$p.cat.create('meta_ids');

/**
* ### Справочник Кассы
* Список мест фактического хранения и движения наличных денежных средств предприятия. Кассы разделены по организациям и валютам денежных средств. 
* @class CatCashboxes
* @extends CatObj
* @constructor 
*/
class CatCashboxes extends CatObj{
get funds_currency(){return this._getter('funds_currency')}
set funds_currency(v){this._setter('funds_currency',v)}
get department(){return this._getter('department')}
set department(v){this._setter('department',v)}
get current_account(){return this._getter('current_account')}
set current_account(v){this._setter('current_account',v)}
get owner(){return this._getter('owner')}
set owner(v){this._setter('owner',v)}
}
$p.CatCashboxes = CatCashboxes;
$p.cat.create('cashboxes');

/**
* ### Справочник Контрагенты
* Список юридических или физических лиц клиентов (поставщиков, покупателей).
* @class CatPartners
* @extends CatObj
* @constructor 
*/
class CatPartners extends CatObj{
get name_full(){return this._getter('name_full')}
set name_full(v){this._setter('name_full',v)}
get main_bank_account(){return this._getter('main_bank_account')}
set main_bank_account(v){this._setter('main_bank_account',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get okpo(){return this._getter('okpo')}
set okpo(v){this._setter('okpo',v)}
get individual_legal(){return this._getter('individual_legal')}
set individual_legal(v){this._setter('individual_legal',v)}
get main_contract(){return this._getter('main_contract')}
set main_contract(v){this._setter('main_contract',v)}
get identification_document(){return this._getter('identification_document')}
set identification_document(v){this._setter('identification_document',v)}
get buyer_main_manager(){return this._getter('buyer_main_manager')}
set buyer_main_manager(v){this._setter('buyer_main_manager',v)}
get is_buyer(){return this._getter('is_buyer')}
set is_buyer(v){this._setter('is_buyer',v)}
get is_supplier(){return this._getter('is_supplier')}
set is_supplier(v){this._setter('is_supplier',v)}
get primary_contact(){return this._getter('primary_contact')}
set primary_contact(v){this._setter('primary_contact',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
}
$p.CatPartners = CatPartners;
class CatPartnersContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
}
$p.CatPartnersContact_informationRow = CatPartnersContact_informationRow;
class CatPartnersExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatPartnersExtra_fieldsRow = CatPartnersExtra_fieldsRow;
$p.cat.create('partners');

/**
* ### Справочник Организации
* Организации
* @class CatOrganizations
* @extends CatObj
* @constructor 
*/
class CatOrganizations extends CatObj{
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get individual_legal(){return this._getter('individual_legal')}
set individual_legal(v){this._setter('individual_legal',v)}
get individual_entrepreneur(){return this._getter('individual_entrepreneur')}
set individual_entrepreneur(v){this._setter('individual_entrepreneur',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get kpp(){return this._getter('kpp')}
set kpp(v){this._setter('kpp',v)}
get ogrn(){return this._getter('ogrn')}
set ogrn(v){this._setter('ogrn',v)}
get main_bank_account(){return this._getter('main_bank_account')}
set main_bank_account(v){this._setter('main_bank_account',v)}
get main_cashbox(){return this._getter('main_cashbox')}
set main_cashbox(v){this._setter('main_cashbox',v)}
get certificate_series_number(){return this._getter('certificate_series_number')}
set certificate_series_number(v){this._setter('certificate_series_number',v)}
get certificate_date_issue(){return this._getter('certificate_date_issue')}
set certificate_date_issue(v){this._setter('certificate_date_issue',v)}
get certificate_authority_name(){return this._getter('certificate_authority_name')}
set certificate_authority_name(v){this._setter('certificate_authority_name',v)}
get certificate_authority_code(){return this._getter('certificate_authority_code')}
set certificate_authority_code(v){this._setter('certificate_authority_code',v)}
get chief(){return this._getter('chief')}
set chief(v){this._setter('chief',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
}
$p.CatOrganizations = CatOrganizations;
class CatOrganizationsContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
get list_view(){return this._getter('list_view')}
set list_view(v){this._setter('list_view',v)}
get act_from(){return this._getter('act_from')}
set act_from(v){this._setter('act_from',v)}
}
$p.CatOrganizationsContact_informationRow = CatOrganizationsContact_informationRow;
class CatOrganizationsExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatOrganizationsExtra_fieldsRow = CatOrganizationsExtra_fieldsRow;
$p.cat.create('organizations');

/**
* ### Справочник Вставки
* Армирование, пленки, вставки - дополнение спецификации, которое зависит от одного элемента
* @class CatInserts
* @extends CatObj
* @constructor 
*/
class CatInserts extends CatObj{
}
$p.CatInserts = CatInserts;
$p.cat.create('inserts');

/**
* ### Справочник КлючиПараметров
* Списки пар {Параметр:Значение} для фильтрации в подсистемах формирования спецификаций, планировании и ценообразовании

* @class CatParameters_keys
* @extends CatObj
* @constructor 
*/
class CatParameters_keys extends CatObj{
get priority(){return this._getter('priority')}
set priority(v){this._setter('priority',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get applying(){return this._getter('applying')}
set applying(v){this._setter('applying',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get editor(){return this._getter('editor')}
set editor(v){this._setter('editor',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get params(){return this._getter_ts('params')}
set params(v){this._setter_ts('params',v)}
}
$p.CatParameters_keys = CatParameters_keys;
class CatParameters_keysParamsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get comparison_type(){return this._getter('comparison_type')}
set comparison_type(v){this._setter('comparison_type',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatParameters_keysParamsRow = CatParameters_keysParamsRow;
$p.cat.create('parameters_keys');

/**
* ### Справочник пзПараметрыПродукции
* Настройки системы профилей и фурнитуры
* @class CatProduction_params
* @extends CatObj
* @constructor 
*/
class CatProduction_params extends CatObj{
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatProduction_params = CatProduction_params;
$p.cat.create('production_params');

/**
* ### Справочник РайоныДоставки
* Районы доставки
* @class CatDelivery_areas
* @extends CatObj
* @constructor 
*/
class CatDelivery_areas extends CatObj{
}
$p.CatDelivery_areas = CatDelivery_areas;
$p.cat.create('delivery_areas');

/**
* ### Справочник пзФурнитура
* Описывает ограничения и правила формирования спецификаций фурнитуры
* @class CatFurns
* @extends CatObj
* @constructor 
*/
class CatFurns extends CatObj{
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
}
$p.CatFurns = CatFurns;
$p.cat.create('furns');

/**
* ### Справочник Подразделения
* Перечень подразделений предприятия
* @class CatDivisions
* @extends CatObj
* @constructor 
*/
class CatDivisions extends CatObj{
get main_project(){return this._getter('main_project')}
set main_project(v){this._setter('main_project',v)}
get sorting_field(){return this._getter('sorting_field')}
set sorting_field(v){this._setter('sorting_field',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
}
$p.CatDivisions = CatDivisions;
class CatDivisionsExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatDivisionsExtra_fieldsRow = CatDivisionsExtra_fieldsRow;
$p.cat.create('divisions');

/**
* ### Справочник Пользователи
* Пользователи
* @class CatUsers
* @extends CatObj
* @constructor 
*/
class CatUsers extends CatObj{
get invalid(){return this._getter('invalid')}
set invalid(v){this._setter('invalid',v)}
get department(){return this._getter('department')}
set department(v){this._setter('department',v)}
get individual_person(){return this._getter('individual_person')}
set individual_person(v){this._setter('individual_person',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get ancillary(){return this._getter('ancillary')}
set ancillary(v){this._setter('ancillary',v)}
get user_ib_uid(){return this._getter('user_ib_uid')}
set user_ib_uid(v){this._setter('user_ib_uid',v)}
get id(){return this._getter('id')}
set id(v){this._setter('id',v)}
get latin(){return this._getter('latin')}
set latin(v){this._setter('latin',v)}
get prefix(){return this._getter('prefix')}
set prefix(v){this._setter('prefix',v)}
get branch(){return this._getter('branch')}
set branch(v){this._setter('branch',v)}
get push_only(){return this._getter('push_only')}
set push_only(v){this._setter('push_only',v)}
get roles(){return this._getter('roles')}
set roles(v){this._setter('roles',v)}
get suffix(){return this._getter('suffix')}
set suffix(v){this._setter('suffix',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
get acl_objs(){return this._getter_ts('acl_objs')}
set acl_objs(v){this._setter_ts('acl_objs',v)}
get ids(){return this._getter_ts('ids')}
set ids(v){this._setter_ts('ids',v)}
get subscribers(){return this._getter_ts('subscribers')}
set subscribers(v){this._setter_ts('subscribers',v)}
}
$p.CatUsers = CatUsers;
class CatUsersExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatUsersExtra_fieldsRow = CatUsersExtra_fieldsRow;
class CatUsersContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
get list_view(){return this._getter('list_view')}
set list_view(v){this._setter('list_view',v)}
}
$p.CatUsersContact_informationRow = CatUsersContact_informationRow;
class CatUsersAcl_objsRow extends TabularSectionRow{
get acl_obj(){return this._getter('acl_obj')}
set acl_obj(v){this._setter('acl_obj',v)}
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get by_default(){return this._getter('by_default')}
set by_default(v){this._setter('by_default',v)}
}
$p.CatUsersAcl_objsRow = CatUsersAcl_objsRow;
class CatUsersIdsRow extends TabularSectionRow{
get identifier(){return this._getter('identifier')}
set identifier(v){this._setter('identifier',v)}
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
}
$p.CatUsersIdsRow = CatUsersIdsRow;
class CatUsersSubscribersRow extends TabularSectionRow{
get abonent(){return this._getter('abonent')}
set abonent(v){this._setter('abonent',v)}
}
$p.CatUsersSubscribersRow = CatUsersSubscribersRow;
class CatUsersManager extends CatManager {

  constructor(owner, class_name) {
    super(owner, class_name);
    const authenticated = (user) => {
      return this.create(user);
    }
    this.adapter.on({authenticated});
  }

  // пользователей не выгружаем
  unload_obj() {	}

  // не надо пытаться
  find_rows_remote() {

  }

}
$p.cat.create('users', CatUsersManager, false);

/**
* ### Справочник Склады
* Сведения о местах хранения товаров (складах), их структуре и физических лицах, назначенных материально ответственными (МОЛ) за тот или иной склад
* @class CatStores
* @extends CatObj
* @constructor 
*/
class CatStores extends CatObj{
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get department(){return this._getter('department')}
set department(v){this._setter('department',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
}
$p.CatStores = CatStores;
class CatStoresExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatStoresExtra_fieldsRow = CatStoresExtra_fieldsRow;
$p.cat.create('stores');

/**
* ### Справочник ТипыЦенНоменклатуры
* Перечень типов отпускных цен предприятия
* @class CatNom_prices_types
* @extends CatObj
* @constructor 
*/
class CatNom_prices_types extends CatObj{
get price_currency(){return this._getter('price_currency')}
set price_currency(v){this._setter('price_currency',v)}
get discount_percent(){return this._getter('discount_percent')}
set discount_percent(v){this._setter('discount_percent',v)}
get vat_price_included(){return this._getter('vat_price_included')}
set vat_price_included(v){this._setter('vat_price_included',v)}
get rounding_order(){return this._getter('rounding_order')}
set rounding_order(v){this._setter('rounding_order',v)}
get rounding_in_a_big_way(){return this._getter('rounding_in_a_big_way')}
set rounding_in_a_big_way(v){this._setter('rounding_in_a_big_way',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
}
$p.CatNom_prices_types = CatNom_prices_types;
$p.cat.create('nom_prices_types');

/**
* ### Справочник ФизическиеЛица
* Физические лица
* @class CatIndividuals
* @extends CatObj
* @constructor 
*/
class CatIndividuals extends CatObj{
get birth_date(){return this._getter('birth_date')}
set birth_date(v){this._setter('birth_date',v)}
get inn(){return this._getter('inn')}
set inn(v){this._setter('inn',v)}
get imns_code(){return this._getter('imns_code')}
set imns_code(v){this._setter('imns_code',v)}
get note(){return this._getter('note')}
set note(v){this._setter('note',v)}
get pfr_number(){return this._getter('pfr_number')}
set pfr_number(v){this._setter('pfr_number',v)}
get sex(){return this._getter('sex')}
set sex(v){this._setter('sex',v)}
get birth_place(){return this._getter('birth_place')}
set birth_place(v){this._setter('birth_place',v)}
get Фамилия(){return this._getter('Фамилия')}
set Фамилия(v){this._setter('Фамилия',v)}
get Имя(){return this._getter('Имя')}
set Имя(v){this._setter('Имя',v)}
get Отчество(){return this._getter('Отчество')}
set Отчество(v){this._setter('Отчество',v)}
get ФамилияРП(){return this._getter('ФамилияРП')}
set ФамилияРП(v){this._setter('ФамилияРП',v)}
get ИмяРП(){return this._getter('ИмяРП')}
set ИмяРП(v){this._setter('ИмяРП',v)}
get ОтчествоРП(){return this._getter('ОтчествоРП')}
set ОтчествоРП(v){this._setter('ОтчествоРП',v)}
get ОснованиеРП(){return this._getter('ОснованиеРП')}
set ОснованиеРП(v){this._setter('ОснованиеРП',v)}
get ДолжностьРП(){return this._getter('ДолжностьРП')}
set ДолжностьРП(v){this._setter('ДолжностьРП',v)}
get Должность(){return this._getter('Должность')}
set Должность(v){this._setter('Должность',v)}
get captured(){return this._getter('captured')}
set captured(v){this._setter('captured',v)}
get zones(){return this._getter('zones')}
set zones(v){this._setter('zones',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}
get contact_information(){return this._getter_ts('contact_information')}
set contact_information(v){this._setter_ts('contact_information',v)}
}
$p.CatIndividuals = CatIndividuals;
class CatIndividualsContact_informationRow extends TabularSectionRow{
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get kind(){return this._getter('kind')}
set kind(v){this._setter('kind',v)}
get presentation(){return this._getter('presentation')}
set presentation(v){this._setter('presentation',v)}
get values_fields(){return this._getter('values_fields')}
set values_fields(v){this._setter('values_fields',v)}
get country(){return this._getter('country')}
set country(v){this._setter('country',v)}
get region(){return this._getter('region')}
set region(v){this._setter('region',v)}
get city(){return this._getter('city')}
set city(v){this._setter('city',v)}
get email_address(){return this._getter('email_address')}
set email_address(v){this._setter('email_address',v)}
get server_domain_name(){return this._getter('server_domain_name')}
set server_domain_name(v){this._setter('server_domain_name',v)}
get phone_number(){return this._getter('phone_number')}
set phone_number(v){this._setter('phone_number',v)}
get phone_without_codes(){return this._getter('phone_without_codes')}
set phone_without_codes(v){this._setter('phone_without_codes',v)}
get list_view(){return this._getter('list_view')}
set list_view(v){this._setter('list_view',v)}
}
$p.CatIndividualsContact_informationRow = CatIndividualsContact_informationRow;
$p.cat.create('individuals');

/**
* ### Справочник ИнтеграцияСерверы
* Серверы CouchDB
* @class CatServers
* @extends CatObj
* @constructor 
*/
class CatServers extends CatObj{
get http(){return this._getter('http')}
set http(v){this._setter('http',v)}
get username(){return this._getter('username')}
set username(v){this._setter('username',v)}
get password(){return this._getter('password')}
set password(v){this._setter('password',v)}
get callbackurl(){return this._getter('callbackurl')}
set callbackurl(v){this._setter('callbackurl',v)}


  db(abonent, cachable) {
    if(!this._dbs) {
      this._dbs = new Map();
    }
    if(!this._dbs.get(abonent)) {
      this._dbs.set(abonent, {});
    }
    const dbs = this._dbs.get(abonent);
    if(!dbs[cachable]) {
      const {adapter, _owner: {$p}} = this._manager;
      const {auth} = adapter.remote.ram.__opts;
      const opts = {skip_setup: true, auth};
      dbs[cachable] = new $p.classes.PouchDB(
        cachable[0] === '_' ?
          this.http.replacs($p.job_prm.local_storage_prefix, cachable)
          :
          `${this.http}${abonent.id}_${cachable}`, opts);
    }
    return dbs[cachable];
  }
}
$p.CatServers = CatServers;
$p.cat.create('servers');

/**
* ### Справочник ИнтеграцияАбоненты
* Абоненты
* @class CatAbonents
* @extends CatObj
* @constructor 
*/
class CatAbonents extends CatObj{
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
get repl_mango(){return this._getter('repl_mango')}
set repl_mango(v){this._setter('repl_mango',v)}
get repl_templates(){return this._getter('repl_templates')}
set repl_templates(v){this._setter('repl_templates',v)}
get acl_objs(){return this._getter_ts('acl_objs')}
set acl_objs(v){this._setter_ts('acl_objs',v)}
get ex_bases(){return this._getter_ts('ex_bases')}
set ex_bases(v){this._setter_ts('ex_bases',v)}


  db(cachable) {
    return this.server.db(this, cachable);
  }}
$p.CatAbonents = CatAbonents;
class CatAbonentsAcl_objsRow extends TabularSectionRow{
get obj(){return this._getter('obj')}
set obj(v){this._setter('obj',v)}
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
}
$p.CatAbonentsAcl_objsRow = CatAbonentsAcl_objsRow;
class CatAbonentsEx_basesRow extends TabularSectionRow{
get name(){return this._getter('name')}
set name(v){this._setter('name',v)}
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
}
$p.CatAbonentsEx_basesRow = CatAbonentsEx_basesRow;
$p.cat.create('abonents');

/**
* ### Справочник НаправленияДоставки
* Объединяет районы, территории или подразделения продаж
* @class CatDelivery_directions
* @extends CatObj
* @constructor 
*/
class CatDelivery_directions extends CatObj{
}
$p.CatDelivery_directions = CatDelivery_directions;
$p.cat.create('delivery_directions');

/**
* ### Документ Расчет
* Аналог заказа покупателя типовых конфигураций.
Содержит инструменты для формирования спецификаций и подготовки данных производства и диспетчеризации
* @class DocCalc_order
* @extends DocObj
* @constructor 
*/
class DocCalc_order extends DocObj{
}
$p.DocCalc_order = DocCalc_order;
$p.doc.create('calc_order');

/**
* ### Регистр сведений log_view
* Просмотр журнала событий
* @class IregLog_view
* @extends RegisterRow
* @constructor 
*/
class IregLog_view extends RegisterRow{
get key(){return this._getter('key')}
set key(v){this._setter('key',v)}
get user(){return this._getter('user')}
set user(v){this._setter('user',v)}
}
$p.IregLog_view = IregLog_view;
$p.ireg.create('log_view');
})();
};