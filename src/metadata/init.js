/* eslint-disable */
module.exports = function meta_init($p) {
  $p.wsql.alasql('USE md; DROP TABLE IF EXISTS cch_mdm_groups; DROP TABLE IF EXISTS cat_abonents; DROP TABLE IF EXISTS cat_branches; DROP TABLE IF EXISTS cat_http_apis; DROP TABLE IF EXISTS cat_clrs; DROP TABLE IF EXISTS cat_servers; DROP TABLE IF EXISTS cat_users; DROP TABLE IF EXISTS ireg_delivery_schedules; DROP TABLE IF EXISTS ireg_delivery_scheme;', []);

  $p.wsql.alasql('USE md; CREATE TABLE IF NOT EXISTS `ireg_delivery_schedules` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `warehouse` CHAR, `delivery_area` CHAR, `date` Date, `start` BOOLEAN); CREATE TABLE IF NOT EXISTS `ireg_delivery_scheme` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `warehouse` CHAR, `delivery_area` CHAR, `chain_warehouse` CHAR, `chain_area` CHAR, `chain` INT); CREATE TABLE IF NOT EXISTS `ireg_log_view` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `key` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `ireg_log` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, `date` INT, `sequence` INT, `class` CHAR, `note` CHAR, `obj` CHAR, `user` CHAR); CREATE TABLE IF NOT EXISTS `cat_http_apis` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `ts_nom` JSON, `ts_params` JSON); CREATE TABLE IF NOT EXISTS `cat_abonents` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `server` CHAR, `repl_mango` BOOLEAN, `repl_templates` BOOLEAN, `no_mdm` BOOLEAN, `ts_acl_objs` JSON, `ts_ex_bases` JSON, `ts_extra_fields` JSON, `ts_http_apis` JSON); CREATE TABLE IF NOT EXISTS `cat_servers` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `http` CHAR, `http_local` CHAR, `username` CHAR, `password` CHAR, `callbackurl` CHAR, `hv` CHAR); CREATE TABLE IF NOT EXISTS `cat_users` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `invalid` BOOLEAN, `department` CHAR, `individual_person` CHAR, `note` CHAR, `ancillary` BOOLEAN, `user_ib_uid` CHAR, `id` CHAR, `latin` CHAR, `prefix` CHAR, `branch` CHAR, `push_only` BOOLEAN, `roles` CHAR, `ips` CHAR, `suffix` CHAR, `direct` BOOLEAN, `ts_extra_fields` JSON, `ts_contact_information` JSON, `ts_acl_objs` JSON, `ts_ids` JSON, `ts_subscribers` JSON); CREATE TABLE IF NOT EXISTS `cat_clrs` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `ral` CHAR, `machine_tools_clr` CHAR, `clr_str` CHAR, `clr_out` CHAR, `clr_in` CHAR, `grouping` CHAR, `predefined_name` CHAR, `parent` CHAR); CREATE TABLE IF NOT EXISTS `cat_branches` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `suffix` CHAR, `server` CHAR, `back_server` CHAR, `repl_server` CHAR, `direct` BOOLEAN, `use` BOOLEAN, `mode` INT, `no_mdm` BOOLEAN, `no_partners` BOOLEAN, `no_divisions` BOOLEAN, `owner` CHAR, `parent` CHAR, `ts_organizations` JSON, `ts_partners` JSON, `ts_divisions` JSON, `ts_price_types` JSON, `ts_keys` JSON, `ts_extra_fields` JSON); CREATE TABLE IF NOT EXISTS `cat_scheme_settings` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `obj` CHAR, `user` CHAR, `order` INT, `query` CHAR, `date_from` Date, `date_till` Date, `standard_period` CHAR, `formula` CHAR, `output` CHAR, `tag` CHAR, `ts_fields` JSON, `ts_sorting` JSON, `ts_dimensions` JSON, `ts_resources` JSON, `ts_selection` JSON, `ts_params` JSON, `ts_composition` JSON, `ts_conditional_appearance` JSON); CREATE TABLE IF NOT EXISTS `cat_meta_fields` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cat_meta_objs` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN); CREATE TABLE IF NOT EXISTS `cch_mdm_groups` (ref CHAR PRIMARY KEY NOT NULL, `_deleted` BOOLEAN, id CHAR, name CHAR, is_folder BOOLEAN, `mode` INT, `predefined_name` CHAR, `type` CHAR, `ts_elmnts` JSON, `ts_applying` JSON); ', []);

  $p.md.init({"enm":{"accumulation_record_type":[{"order":0,"name":"debit","synonym":"Приход"},{"order":1,"name":"credit","synonym":"Расход"}],"sort_directions":[{"order":0,"name":"asc","synonym":"По возрастанию","default":true},{"order":1,"name":"desc","synonym":"По убыванию"}],"comparison_types":[{"order":0,"name":"gt","synonym":"Больше"},{"order":1,"name":"gte","synonym":"Больше или равно"},{"order":2,"name":"lt","synonym":"Меньше"},{"order":3,"name":"lte","synonym":"Меньше или равно "},{"order":4,"name":"eq","synonym":"Равно","default":true},{"order":5,"name":"ne","synonym":"Не равно"},{"order":6,"name":"in","synonym":"В списке"},{"order":7,"name":"nin","synonym":"Не в списке"},{"order":8,"name":"lke","synonym":"Содержит "},{"order":9,"name":"nlk","synonym":"Не содержит"},{"order":10,"name":"filled","synonym":"Заполнено "},{"order":11,"name":"nfilled","synonym":"Не заполнено"}],"label_positions":[{"order":0,"name":"inherit","synonym":"Наследовать","default":true},{"order":1,"name":"hide","synonym":"Скрыть"},{"order":2,"name":"left","synonym":"Лево"},{"order":3,"name":"right","synonym":"Право"},{"order":4,"name":"top","synonym":"Верх"},{"order":5,"name":"bottom","synonym":"Низ"}],"data_field_kinds":[{"order":0,"name":"field","synonym":"Поле ввода","default":true},{"order":1,"name":"input","synonym":"Простой текст"},{"order":2,"name":"text","synonym":"Многострочный текст"},{"order":3,"name":"label","synonym":"Надпись"},{"order":4,"name":"link","synonym":"Гиперссылка"},{"order":5,"name":"cascader","synonym":"Каскадер"},{"order":6,"name":"toggle","synonym":"Переключатель"},{"order":7,"name":"image","synonym":"Картинка"},{"order":8,"name":"type","synonym":"Тип значения"},{"order":9,"name":"path","synonym":"Путь к данным"},{"order":10,"name":"typed_field","synonym":"Поле связи по типу"},{"order":11,"name":"props","synonym":"Свойства объекта"},{"order":12,"name":"star","synonym":"Пометка"}],"standard_period":[{"order":0,"name":"custom","synonym":"Произвольный","default":true},{"order":1,"name":"yesterday","synonym":"Вчера"},{"order":2,"name":"today","synonym":"Сегодня"},{"order":3,"name":"tomorrow","synonym":"Завтра"},{"order":4,"name":"last7days","synonym":"Последние 7 дней"},{"order":5,"name":"last30days","synonym":"Последние 30 дней"},{"order":6,"name":"last3Month","synonym":"Последние 3 месяца"},{"order":7,"name":"last6Month","synonym":"Последние 6 месяцев"},{"order":8,"name":"lastWeek","synonym":"Прошлая неделя"},{"order":9,"name":"lastTendays","synonym":"Прошлая декада"},{"order":10,"name":"lastMonth","synonym":"Прошлый месяц"},{"order":11,"name":"lastQuarter","synonym":"Прошлый квартал"},{"order":12,"name":"lastHalfYear","synonym":"Прошлое полугодие"},{"order":13,"name":"lastYear","synonym":"Прошлый год"},{"order":14,"name":"next7Days","synonym":"Следующие 7 дней"},{"order":15,"name":"nextTendays","synonym":"Следующая декада"},{"order":16,"name":"nextWeek","synonym":"Следующая неделя"},{"order":17,"name":"nextMonth","synonym":"Следующий месяц"},{"order":18,"name":"nextQuarter","synonym":"Следующий квартал"},{"order":19,"name":"nextHalfYear","synonym":"Следующее полугодие"},{"order":20,"name":"nextYear","synonym":"Следующий год"},{"order":21,"name":"tillEndOfThisYear","synonym":"До конца этого года"},{"order":22,"name":"tillEndOfThisQuarter","synonym":"До конца этого квартала"},{"order":23,"name":"tillEndOfThisMonth","synonym":"До конца этого месяца"},{"order":24,"name":"tillEndOfThisHalfYear","synonym":"До конца этого полугодия"},{"order":25,"name":"tillEndOfThistendays","synonym":"До конца этой декады"},{"order":26,"name":"tillEndOfThisweek","synonym":"До конца этой недели"},{"order":27,"name":"fromBeginningOfThisYear","synonym":"С начала этого года"},{"order":28,"name":"fromBeginningOfThisQuarter","synonym":"С начала этого квартала"},{"order":29,"name":"fromBeginningOfThisMonth","synonym":"С начала этого месяца"},{"order":30,"name":"fromBeginningOfThisHalfYear","synonym":"С начала этого полугодия"},{"order":31,"name":"fromBeginningOfThisTendays","synonym":"С начала этой декады"},{"order":32,"name":"fromBeginningOfThisWeek","synonym":"С начала этой недели"},{"order":33,"name":"thisTenDays","synonym":"Эта декада"},{"order":34,"name":"thisWeek","synonym":"Эта неделя"},{"order":35,"name":"thisHalfYear","synonym":"Это полугодие"},{"order":36,"name":"thisYear","synonym":"Этот год"},{"order":37,"name":"thisQuarter","synonym":"Этот квартал"},{"order":38,"name":"thisMonth","synonym":"Этот месяц"}],"quick_access":[{"order":0,"name":"none","synonym":"Нет","default":true},{"order":1,"name":"toolbar","synonym":"Панель инструментов"},{"order":2,"name":"drawer","synonym":"Панель формы"}],"report_output":[{"order":0,"name":"grid","synonym":"Таблица","default":true},{"order":1,"name":"chart","synonym":"Диаграмма"},{"order":2,"name":"pivot","synonym":"Cводная таблица"},{"order":3,"name":"html","synonym":"Документ HTML"}]},"ireg":{"log":{"name":"log","note":"","synonym":"Журнал событий","dimensions":{"date":{"synonym":"Дата","tooltip":"Время события","type":{"types":["number"],"digits":15,"fraction":0}},"sequence":{"synonym":"Порядок","tooltip":"Порядок следования","type":{"types":["number"],"digits":6,"fraction":0}}},"resources":{"class":{"synonym":"Класс","tooltip":"Класс события","type":{"types":["string"],"str_len":100}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Текст события","type":{"types":["string"],"str_len":0}},"obj":{"synonym":"Объект","multiline_mode":true,"tooltip":"Объект, к которому относится событие","type":{"types":["string"],"str_len":0}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, в сеансе которого произошло событие","type":{"types":["string"],"str_len":100}}}},"log_view":{"name":"log_view","note":"","synonym":"Просмотр журнала событий","dimensions":{"key":{"synonym":"Ключ","tooltip":"Ключ события","type":{"types":["string"],"str_len":100}},"user":{"synonym":"Пользователь","tooltip":"Пользователь, отметивыший событие, как просмотренное","type":{"types":["string"],"str_len":100}}}},"delivery_scheme":{"name":"СхемаДоставки","splitted":false,"note":"","synonym":"Схема доставки готовой продукции","dimensions":{"warehouse":{"synonym":"Склад отправления","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.stores"],"is_ref":true}},"delivery_area":{"synonym":"Район доставки","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.delivery_areas"],"is_ref":true}},"chain_warehouse":{"synonym":"Промежуточный склад","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.stores"],"is_ref":true}},"chain_area":{"synonym":"Промежуточный район","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.delivery_areas"],"is_ref":true}}},"resources":{"chain":{"synonym":"Номер звена","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":2,"fraction":0}}},"attributes":{},"cachable":"ram","read_only":true},"delivery_schedules":{"name":"ГрафикиДоставки","splitted":false,"note":"","synonym":"Графики доставки по районам","dimensions":{"warehouse":{"synonym":"Точка отправления","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.stores"],"is_ref":true}},"delivery_area":{"synonym":"Географическая зона","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.delivery_areas"],"is_ref":true}},"date":{"synonym":"Дата","multiline_mode":false,"tooltip":"","type":{"types":["date"],"date_part":"date"}}},"resources":{"start":{"synonym":"Выезд","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}},"attributes":{},"cachable":"ram","read_only":true}},"cat":{"meta_objs":{"fields":{}},"meta_fields":{"fields":{}},"scheme_settings":{"name":"scheme_settings","synonym":"Настройки отчетов и списков","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"obj":{"synonym":"Объект","tooltip":"Имя класса метаданных","type":{"types":["string"],"str_len":250}},"user":{"synonym":"Пользователь","tooltip":"Если пусто - публичная настройка","type":{"types":["string"],"str_len":50}},"order":{"synonym":"Порядок","tooltip":"Порядок варианта","type":{"types":["number"],"digits":6,"fraction":0}},"query":{"synonym":"Запрос","tooltip":"Индекс CouchDB или текст SQL","type":{"types":["string"],"str_len":0}},"date_from":{"synonym":"Начало периода","tooltip":"","type":{"types":["date"],"date_part":"date"}},"date_till":{"synonym":"Конец периода","tooltip":"","type":{"types":["date"],"date_part":"date"}},"standard_period":{"synonym":"Стандартный период","tooltip":"Использование стандартного периода","type":{"types":["enm.standard_period"],"is_ref":true}},"formula":{"synonym":"Формула","tooltip":"Формула инициализации","type":{"types":["cat.formulas"],"is_ref":true}},"output":{"synonym":"Вывод","tooltip":"Вывод результата","type":{"types":["enm.report_output"],"is_ref":true}},"tag":{"synonym":"Дополнительные свойства","type":{"types":["string"],"str_len":0}}},"tabular_sections":{"fields":{"name":"fields","synonym":"Доступные поля","tooltip":"Состав, порядок и ширина колонок","fields":{"parent":{"synonym":"Родитель","tooltip":"Для плоского списка, родитель пустой","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"width":{"synonym":"Ширина","tooltip":"","type":{"types":["string"],"str_len":6}},"caption":{"synonym":"Заголовок","tooltip":"","type":{"types":["string"],"str_len":100}},"tooltip":{"synonym":"Подсказка","tooltip":"","type":{"types":["string"],"str_len":100}},"ctrl_type":{"synonym":"Тип","tooltip":"Тип элемента управления","type":{"types":["enm.data_field_kinds"],"is_ref":true}},"formatter":{"synonym":"Формат","tooltip":"Функция форматирования","type":{"types":["cat.formulas"],"is_ref":true}},"editor":{"synonym":"Редактор","tooltip":"Компонент редактирования","type":{"types":["cat.formulas"],"is_ref":true}}}},"sorting":{"name":"sorting","synonym":"Поля сортировки","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"direction":{"synonym":"Направление","tooltip":"","type":{"types":["enm.sort_directions"],"is_ref":true}}}},"dimensions":{"name":"dimensions","synonym":"Поля группировки","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}}}},"resources":{"name":"resources","synonym":"Ресурсы","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Поле","tooltip":"","type":{"types":["string"],"str_len":100}},"formula":{"synonym":"Формула","tooltip":"По умолчанию - сумма","type":{"types":["cat.formulas"],"is_ref":true}}}},"selection":{"name":"selection","synonym":"Отбор","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"left_value":{"synonym":"Левое значение","tooltip":"Путь к данным","type":{"types":["string"],"str_len":255}},"left_value_type":{"synonym":"Тип слева","tooltip":"Тип значения слева","default":"path","type":{"types":["string"],"str_len":100}},"comparison_type":{"synonym":"Вид сравнения","tooltip":"","type":{"types":["enm.comparison_types"],"is_ref":true}},"right_value":{"synonym":"Правое значение","tooltip":"","type":{"types":["string"],"str_len":100}},"right_value_type":{"synonym":"Тип справа","tooltip":"Тип значения справа","default":"path","type":{"types":["string"],"str_len":100}}}},"params":{"name":"params","synonym":"Параметры","tooltip":"","fields":{"param":{"synonym":"Параметр","tooltip":"","type":{"types":["string"],"str_len":100}},"value_type":{"synonym":"Тип","tooltip":"Тип значения","type":{"types":["string"],"str_len":100}},"value":{"synonym":"Значение","tooltip":"Может иметь примитивный или ссылочный тип или массив","type":{"types":["string","number"],"str_len":0,"digits":15,"fraction":3,"date_part":"date"}},"quick_access":{"synonym":"Быстрый доступ","tooltip":"Размещать на нанели инструментов","type":{"types":["boolean"]}}}},"composition":{"name":"composition","synonym":"Структура","tooltip":"","fields":{"parent":{"synonym":"Родитель","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":10}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"field":{"synonym":"Элемент","tooltip":"Элемент структуры отчета","type":{"types":["string"],"str_len":50}},"kind":{"synonym":"Вид раздела отчета","tooltip":"список, таблица, группировка строк, группировка колонок","type":{"types":["string"],"str_len":50}},"definition":{"synonym":"Описание","tooltip":"Описание раздела структуры","type":{"types":["string"],"str_len":50}}}},"conditional_appearance":{"name":"conditional_appearance","synonym":"Условное оформление","tooltip":"","fields":{"parent":{"synonym":"Родитель","tooltip":"","type":{"types":["string"],"str_len":100}},"use":{"synonym":"Использование","tooltip":"","type":{"types":["boolean"]}},"left_value":{"synonym":"Левое значение","tooltip":"Путь к данным","type":{"types":["string"],"str_len":255}},"left_value_type":{"synonym":"Тип слева","tooltip":"Тип значения слева","default":"path","type":{"types":["string"],"str_len":100}},"comparison_type":{"synonym":"Вид сравнения","tooltip":"","type":{"types":["enm.comparison_types"],"is_ref":true}},"right_value":{"synonym":"Правое значение","tooltip":"","type":{"types":["string"],"str_len":100}},"right_value_type":{"synonym":"Тип справа","tooltip":"Тип значения справа","default":"path","type":{"types":["string"],"str_len":100}},"columns":{"synonym":"Колонки","tooltip":"Список колонок через запятую, к которым будет применено оформление (по умолчанию - ко всей строке)","type":{"types":["string"],"str_len":0}},"css":{"synonym":"Оформление","tooltip":"В синтаксисе css","type":{"types":["string"],"str_len":0}}}}},"cachable":"doc"},"branches":{"name":"ИнтеграцияОтделыАбонентов","splitted":false,"synonym":"Отделы абонентов","illustration":"","obj_presentation":"Отдел абонента","list_presentation":"","input_by_string":["name","suffix"],"hierarchical":true,"has_owners":true,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"suffix":{"synonym":"Суффикс CouchDB","multiline_mode":false,"tooltip":"Для разделения данных в CouchDB","mandatory":true,"type":{"types":["string"],"str_len":4}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"Если указано, используется этот сервер, а не основной сервер абонента","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}},"back_server":{"synonym":"Обратный сервер","multiline_mode":false,"tooltip":"Если указано, этот сервер, для настройки репликации от сервера отдела к родителю","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}},"repl_server":{"synonym":"Сервер репликатора","multiline_mode":false,"tooltip":"Если указано, задание репликации будет запущено на этом сервере","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}},"direct":{"synonym":"Direct","multiline_mode":false,"tooltip":"Для пользователя запрещен режим offline","type":{"types":["boolean"]}},"use":{"synonym":"Используется","multiline_mode":false,"tooltip":"Использовать данный отдел при создании баз и пользователей","type":{"types":["boolean"]}},"mode":{"synonym":"Режим","multiline_mode":false,"tooltip":"Режим репликации текущего отдела","type":{"types":["number"],"digits":1,"fraction":0}},"no_mdm":{"synonym":"NoMDM","multiline_mode":false,"tooltip":"Отключить MDM для данного отдела (напрмиер, если это dev-база)","type":{"types":["boolean"]}},"no_partners":{"synonym":"NoPartners","multiline_mode":false,"tooltip":"Не использовать фильтр по контрагенту в репликации (только по подразделению)","type":{"types":["boolean"]}},"no_divisions":{"synonym":"NoDivisions","multiline_mode":false,"tooltip":"Не использовать фильтр по подразделению в репликации (только по контрагенту)","type":{"types":["boolean"]}},"owner":{"synonym":"Абонент","multiline_mode":false,"tooltip":"Абонент, которому принадлежит отдел","mandatory":true,"type":{"types":["cat.abonents"],"is_ref":true}},"parent":{"synonym":"Ведущий отдел","multiline_mode":false,"tooltip":"Заполняется в случае иерархической репликации","type":{"types":["cat.branches"],"is_ref":true}}},"tabular_sections":{"organizations":{"name":"Организации","synonym":"Организации","tooltip":"Организации, у которых дилер может заказывать продукцию и услуги","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.organizations"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"partners":{"name":"Контрагенты","synonym":"Контрагенты","tooltip":"Юридические лица дилера, от имени которых он оформляет заказы","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.partners"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"divisions":{"name":"Подразделения","synonym":"Подразделения","tooltip":"Подразделения, к данным которых, дилеру предоставлен доступ","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.divisions"],"is_ref":true}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"price_types":{"name":"ТипыЦен","synonym":"Типы цен","tooltip":"Типы цен, привязанные к дилеру","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.nom_prices_types"],"is_ref":true}}}},"keys":{"name":"Ключи","synonym":"Ключи","tooltip":"Ключи параметров, привязанные к дилеру","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["cat.parameters_keys"],"is_ref":true}}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.templates","cat.price_groups","cat.currencies","enm.open_directions","cat.characteristics","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.plan_detailing","cat.abonents","cat.work_center_kinds","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","enm.nested_object_editing_mode","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","original_cachable":"doc"},"clrs":{"name":"пзЦвета","splitted":false,"synonym":"Цвета","illustration":"","obj_presentation":"Цвет","list_presentation":"Цвета","input_by_string":["name","id","ral"],"hierarchical":true,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":9,"fields":{"ral":{"synonym":"Цвет RAL","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":20}},"machine_tools_clr":{"synonym":"Код для станка","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":20}},"clr_str":{"synonym":"Цвет в построителе","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":36}},"clr_out":{"synonym":"Цвет снаружи","multiline_mode":false,"tooltip":"","choice_params":[{"name":"clr_out","path":"00000000-0000-0000-0000-000000000000"},{"name":"clr_in","path":"00000000-0000-0000-0000-000000000000"}],"choice_groups_elm":"elm","type":{"types":["cat.clrs"],"is_ref":true}},"clr_in":{"synonym":"Цвет изнутри","multiline_mode":false,"tooltip":"","choice_params":[{"name":"clr_out","path":"00000000-0000-0000-0000-000000000000"},{"name":"clr_in","path":"00000000-0000-0000-0000-000000000000"}],"choice_groups_elm":"elm","type":{"types":["cat.clrs"],"is_ref":true}},"grouping":{"synonym":"Группировка","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.property_values"],"is_ref":true}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"parent":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cat.clrs"],"is_ref":true}}},"tabular_sections":{},"cachable":"ram","grouping":"array","common":true,"form":{"obj":{"items":[{"element":"FormGroup","row":true,"items":[{"element":"DataField","fld":"name"},{"element":"DataField","fld":"id"},{"element":"DataField","fld":"parent","label":"Папка"}]},{"element":"FormGroup","row":true,"items":[{"element":"DataField","fld":"clr_in"},{"element":"DataField","fld":"clr_out"},{"element":"DataField","fld":"grouping"}]},{"element":"FormGroup","row":true,"items":[{"element":"FieldColor","fld":"clr_str"},{"element":"DataField","fld":"machine_tools_clr"},{"element":"DataField","fld":"ral"}]}]}}},"users":{"name":"Пользователи","splitted":false,"synonym":"Пользователи","illustration":"","obj_presentation":"Пользователь","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"invalid":{"synonym":"Недействителен","multiline_mode":false,"tooltip":"Пользователь больше не работает в программе, но сведения о нем сохранены.\nНедействительные пользователи скрываются из всех списков\nпри выборе или подборе в документах и других местах программы.","type":{"types":["boolean"]}},"department":{"synonym":"Подразделение","multiline_mode":false,"tooltip":"Подразделение, в котором работает пользователь","choice_groups_elm":"elm","type":{"types":["cat.divisions"],"is_ref":true}},"individual_person":{"synonym":"Физическое лицо","multiline_mode":false,"tooltip":"Физическое лицо, с которым связан пользователь","choice_groups_elm":"elm","type":{"types":["cat.individuals"],"is_ref":true}},"note":{"synonym":"Комментарий","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":0}},"ancillary":{"synonym":"Служебный","multiline_mode":false,"tooltip":"Неразделенный или разделенный служебный пользователь, права к которому устанавливаются непосредственно и программно.","type":{"types":["boolean"]}},"user_ib_uid":{"synonym":"Идентификатор пользователя ИБ","multiline_mode":false,"tooltip":"Уникальный идентификатор пользователя информационной базы, с которым сопоставлен этот элемент справочника.","choice_groups_elm":"elm","type":{"types":["string"],"str_len":36,"str_fix":true}},"id":{"synonym":"Логин","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":50}},"latin":{"synonym":"latin","multiline_mode":true,"tooltip":"Произвольная строка","type":{"types":["string"],"str_len":100}},"prefix":{"synonym":"Префикс нумерации","multiline_mode":false,"tooltip":"Префикс номеров документов текущего пользователя","mandatory":true,"type":{"types":["string"],"str_len":2}},"branch":{"synonym":"Отдел","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.branches"],"is_ref":true}},"push_only":{"synonym":"Только push","multiline_mode":false,"tooltip":"Для пользователя установлен режим push-only (изменения мигрируют в одну сторону - от пользователя на сервер)","type":{"types":["boolean"]}},"roles":{"synonym":"Роли Couchdb","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":1000}},"ips":{"synonym":"IP-адреса входа","multiline_mode":false,"tooltip":"Список ip-адресов с маской через запятую, с которых разрешена авторизация\n192.168.9.0/24, 192.168.21.*","type":{"types":["string"],"str_len":0}},"suffix":{"synonym":"Суффикс CouchDB","multiline_mode":false,"tooltip":"Для разделения данных в CouchDB","mandatory":true,"type":{"types":["string"],"str_len":4}},"direct":{"synonym":"Direct","multiline_mode":false,"tooltip":"Для пользователя запрещен режим offline","type":{"types":["boolean"]}}},"tabular_sections":{"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.templates","cat.price_groups","cat.currencies","enm.open_directions","cat.characteristics","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.plan_detailing","cat.abonents","cat.work_center_kinds","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","enm.nested_object_editing_mode","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}},"contact_information":{"name":"КонтактнаяИнформация","synonym":"Контактная информация","tooltip":"Хранение контактной информации (адреса, веб-страницы, номера телефонов и др.)","fields":{"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"Тип контактной информации (телефон, адрес и т.п.)","choice_groups_elm":"elm","type":{"types":["enm.contact_information_types"],"is_ref":true}},"kind":{"synonym":"Вид","multiline_mode":false,"tooltip":"Вид контактной информации","choice_params":[{"name":"parent","path":"8cbaa30d-faab-45ad-880e-84f8b421f448"}],"choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}},"presentation":{"synonym":"Представление","multiline_mode":false,"tooltip":"Представление контактной информации для отображения в формах","type":{"types":["string"],"str_len":500}},"values_fields":{"synonym":"Значения полей","multiline_mode":false,"tooltip":"Служебное поле, для хранения контактной информации","type":{"types":["string"],"str_len":0}},"country":{"synonym":"Страна","multiline_mode":false,"tooltip":"Страна (заполняется для адреса)","type":{"types":["string"],"str_len":100}},"region":{"synonym":"Регион","multiline_mode":false,"tooltip":"Регион (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"city":{"synonym":"Город","multiline_mode":false,"tooltip":"Город (заполняется для адреса)","type":{"types":["string"],"str_len":50}},"email_address":{"synonym":"Адрес ЭП","multiline_mode":false,"tooltip":"Адрес электронной почты","type":{"types":["string"],"str_len":100}},"server_domain_name":{"synonym":"Доменное имя сервера","multiline_mode":false,"tooltip":"Доменное имя сервера электронной почты или веб-страницы","type":{"types":["string"],"str_len":100}},"phone_number":{"synonym":"Номер телефона","multiline_mode":false,"tooltip":"Полный номер телефона","type":{"types":["string"],"str_len":20}},"phone_without_codes":{"synonym":"Номер телефона без кодов","multiline_mode":false,"tooltip":"Номер телефона без кодов и добавочного номера","type":{"types":["string"],"str_len":20}},"list_view":{"synonym":"Вид для списка","multiline_mode":false,"tooltip":"Вид контактной информации для списка","choice_groups_elm":"elm","type":{"types":["cat.contact_information_kinds"],"is_ref":true}}}},"acl_objs":{"name":"ОбъектыДоступа","synonym":"Объекты доступа","tooltip":"","fields":{"acl_obj":{"synonym":"Объект доступа","multiline_mode":false,"tooltip":"","type":{"types":["cat.individuals","cat.users","cat.nom_prices_types","cat.divisions","cat.parameters_keys","cat.partners","cat.organizations","cat.abonents","cat.cashboxes","cat.meta_ids","cat.stores"],"is_ref":true}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":50}},"by_default":{"synonym":"По умолчанию","multiline_mode":false,"tooltip":"","type":{"types":["boolean"]}}}},"ids":{"name":"Идентификаторы","synonym":"Идентификаторы авторизации","tooltip":"","fields":{"identifier":{"synonym":"Идентификатор","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":255}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}}}},"subscribers":{"name":"Абоненты","synonym":"Абоненты","tooltip":"","fields":{"abonent":{"synonym":"Абонент","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.abonents"],"is_ref":true}}}}},"cachable":"ram","form":{"obj":{"head":{" ":["id","name","individual_person"],"Дополнительно":["ancillary","invalid",{"id":"user_ib_uid","path":"o.user_ib_uid","synonym":"Идентификатор пользователя ИБ","type":"ro"},{"id":"user_fresh_uid","path":"o.user_fresh_uid","synonym":"Идентификатор пользователя сервиса","type":"ro"},"note"]},"tabular_sections":{"contact_information":{"fields":["kind","presentation"],"headers":"Вид,Представление","widths":"200,*","min_widths":"100,200","aligns":"","sortings":"na,na","types":"ref,txt"}},"tabular_sections_order":["contact_information"]}}},"servers":{"name":"ИнтеграцияСерверы","splitted":false,"synonym":"Серверы CouchDB","illustration":"","obj_presentation":"Сервер","list_presentation":"Серверы CouchDB","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{"http":{"synonym":"HTTP","multiline_mode":false,"tooltip":"Адрес сервиса интеграции metadata.js или сервера авторизации oAuth","mandatory":true,"type":{"types":["string"],"str_len":255}},"http_local":{"synonym":"HTTP local","multiline_mode":false,"tooltip":"Адрес в локальной сети для репликатора (если не указан, используется основной HTTP)","type":{"types":["string"],"str_len":255}},"username":{"synonym":"Login (consumerKey)","multiline_mode":false,"tooltip":"Login администратора CouchDB или consumerKey сервера oAuth","mandatory":true,"type":{"types":["string"],"str_len":100}},"password":{"synonym":"Password (consumerSecret)","multiline_mode":false,"tooltip":"Пароль администратора CouchDB или consumerSecret сервера oAuth","mandatory":true,"type":{"types":["string"],"str_len":100}},"callbackurl":{"synonym":"Обратный url oAuth","multiline_mode":false,"tooltip":"oAuth callback URL","type":{"types":["string"],"str_len":255}},"hv":{"synonym":"Гипервизор","multiline_mode":false,"tooltip":"Гипервизор, на котором расположен сервер, используется при формировании очереди заданий","type":{"types":["string"],"str_len":20}}},"tabular_sections":{},"cachable":"meta"},"abonents":{"name":"ИнтеграцияАбоненты","splitted":false,"synonym":"Абоненты","illustration":"","obj_presentation":"Абонент","list_presentation":"Абоненты","input_by_string":["name","id"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":6,"fields":{"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"Основной сервер абонента (отделы абонента могут использовать другие серверы)","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}},"repl_mango":{"synonym":"RMango","multiline_mode":false,"tooltip":"Использовать mango-селетор в фильтре репликатора","type":{"types":["boolean"]}},"repl_templates":{"synonym":"RTemplate","multiline_mode":false,"tooltip":"Использовать отдельную базу шаблонов","type":{"types":["boolean"]}},"no_mdm":{"synonym":"NoMDM","multiline_mode":false,"tooltip":"Отключить MDM для данного абонента (напрмиер, если это dev-база)","type":{"types":["boolean"]}}},"tabular_sections":{"acl_objs":{"name":"ОбъектыДоступа","synonym":"Базовые объекты","tooltip":"Базовые объекты к регистрации: системы профилей, фурнитуры, организации, контрагенты","fields":{"obj":{"synonym":"Объект","multiline_mode":false,"tooltip":"","type":{"types":["doc.work_centers_performance","cat.bundle_rows","cat.nom_groups","cat.http_apis","cat.production_params","cat.inserts","cat.templates","cat.price_groups","doc.credit_card_order","cat.leads","cat.nom_units","doc.planning_event","cch.predefined_elmnts","cat.currencies","doc.nom_prices_setup","cat.choice_params","cat.characteristics","cat.projects","cat.individuals","cat.users","cat.insert_bind","cat.partner_bank_accounts","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","doc.debit_bank_order","doc.registers_correction","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","doc.purchase_order","cat.banks_qualifier","doc.credit_cash_order","doc.selling","cat.nom_prices_types","cat.organization_bank_accounts","cat.divisions","cch.mdm_groups","cat.destinations","cat.parameters_keys","doc.purchase","cat.contact_information_kinds","cat.params_links","cat.partners","cat.nonstandard_attributes","doc.debit_cash_order","cat.lead_src","cat.nom_kinds","cat.organizations","cat.countries","cat.units","doc.work_centers_task","cat.abonents","cat.work_center_kinds","cat.servers","doc.calc_order","cat.branches","doc.credit_bank_order","cat.cashboxes","cat.nom","cat.cnns","cat.furns","cat.cash_flow_articles","cat.meta_ids","cat.contracts","cat.stores","cch.properties","cat.clrs"],"is_ref":true}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":255}}}},"ex_bases":{"name":"ДополнительныеБазы","synonym":"Дополнительные базы","tooltip":"Шаблоны, логгер и т.д. - копируем в _security пользователей из ram","fields":{"name":{"synonym":"Наименование","multiline_mode":false,"tooltip":"","mandatory":true,"type":{"types":["string"],"str_len":25}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","mandatory":true,"type":{"types":["cat.servers"],"is_ref":true}}}},"extra_fields":{"name":"ДополнительныеРеквизиты","synonym":"Дополнительные реквизиты","tooltip":"Дополнительные реквизиты объекта","fields":{"property":{"synonym":"Свойство","multiline_mode":false,"tooltip":"Дополнительный реквизит","choice_groups_elm":"elm","type":{"types":["cch.properties"],"is_ref":true}},"value":{"synonym":"Значение","multiline_mode":false,"tooltip":"Значение дополнительного реквизита","choice_links":[{"name":["selection","owner"],"path":["extra_fields","property"]}],"choice_groups_elm":"elm","choice_type":{"path":["extra_fields","property"],"elm":0},"type":{"types":["cat.nom_groups","cat.production_params","cat.inserts","cat.templates","cat.price_groups","cat.currencies","enm.open_directions","cat.characteristics","cat.projects","cat.individuals","cat.users","cat.delivery_areas","cat.color_price_groups","cat.elm_visualization","cat.property_values_hierarchy","cat.formulas","cat.delivery_directions","cat.property_values","boolean","cat.divisions","enm.align_types","cat.parameters_keys","cat.partners","cat.nonstandard_attributes","string","enm.sz_line_types","enm.orientations","cat.organizations","date","cat.units","number","enm.plan_detailing","cat.abonents","cat.work_center_kinds","enm.positions","cat.branches","cat.cashboxes","cat.nom","cat.cnns","cat.furns","enm.vat_rates","enm.nested_object_editing_mode","cat.stores","cch.properties","cat.clrs"],"is_ref":true,"str_len":1024,"date_part":"date_time","digits":15,"fraction":3}},"txt_row":{"synonym":"Текстовая строка","multiline_mode":false,"tooltip":"Полный текст строкового дополнительного реквизита","type":{"types":["string"],"str_len":0}}}},"http_apis":{"name":"ПоставщикиСВнешнимAPI","synonym":"Поставщики с внешним API","tooltip":"","fields":{"is_supplier":{"synonym":"Поставщик","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.http_apis"],"is_ref":true}},"partner":{"synonym":"Контрагент","multiline_mode":false,"tooltip":"Этот контрагент будет указан в Заказах поставщику","mandatory":true,"type":{"types":["cat.partners"],"is_ref":true}},"server":{"synonym":"Сервер","multiline_mode":false,"tooltip":"Сервер для доступа к API поставщика","choice_groups_elm":"elm","type":{"types":["cat.servers"],"is_ref":true}}}}},"cachable":"meta"},"http_apis":{"name":"ПоставщикиСВнешнимAPI","splitted":false,"synonym":"Поставщики с внешним API","illustration":"","obj_presentation":"","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":true,"main_presentation_name":true,"code_length":0,"fields":{},"tabular_sections":{"nom":{"name":"Номенклатура","synonym":"Номенклатура","tooltip":"Позиции с параметрами, которые можно заказать у данного поставщика. В заказе будет номенклатура с уникальной характеристикой","fields":{"identifier":{"synonym":"Идентификатор","multiline_mode":false,"tooltip":"Ид. вставки поставщика","type":{"types":["string"],"str_len":36}},"name":{"synonym":"Наименование","multiline_mode":false,"tooltip":"Наименование у поставщика","type":{"types":["string"],"str_len":50}},"nom":{"synonym":"Номенклатура","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.nom"],"is_ref":true}},"nom_characteristic":{"synonym":"Характеристика","multiline_mode":false,"tooltip":"Характеристика номенклатуры","choice_links":[{"name":["selection","owner"],"path":["nom","nom"]}],"choice_groups_elm":"elm","type":{"types":["cat.characteristics"],"is_ref":true}},"params":{"synonym":"Параметры","multiline_mode":true,"tooltip":"Необходимые данной позиции параметры и диапазоны значений","type":{"types":["string"],"str_len":0}}}},"params":{"name":"Параметры","synonym":"Параметры","tooltip":"Все, используемые данным поставщиком параметры","fields":{"identifier":{"synonym":"Идентификатор","multiline_mode":false,"tooltip":"Ид. параметра поставщика","type":{"types":["string"],"str_len":36}},"name":{"synonym":"Наименование","multiline_mode":false,"tooltip":"Наименование у поставщика","type":{"types":["string"],"str_len":50}},"type":{"synonym":"Тип","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":25}},"values":{"synonym":"Значения","multiline_mode":true,"tooltip":"json-сериализация возможных значений параметра, если параметр предполагает дискретный ряд или enum","type":{"types":["string"],"str_len":0}}}}},"cachable":"ram","read_only":true}},"dp":{"scheme_settings":{"name":"scheme_settings","synonym":"Варианты настроек","fields":{"scheme":{"synonym":"Текущая настройка","tooltip":"Текущий вариант настроек","mandatory":true,"type":{"types":["cat.scheme_settings"],"is_ref":true}}}}},"doc":{},"areg":{},"rep":{},"cch":{"mdm_groups":{"name":"ГруппыMDM","splitted":false,"synonym":"Группы MDM","illustration":"","obj_presentation":"Группа MDM","list_presentation":"","input_by_string":["name"],"hierarchical":false,"has_owners":false,"group_hierarchy":false,"main_presentation_name":true,"code_length":0,"fields":{"mode":{"synonym":"Режим","multiline_mode":false,"tooltip":"","type":{"types":["number"],"digits":1,"fraction":0}},"predefined_name":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["string"],"str_len":256}},"type":{"synonym":"","multiline_mode":false,"tooltip":"","type":{"types":["cch.predefined_elmnts","cat.choice_params","cat.insert_bind","cat.formulas","cat.property_values","cat.params_links","cch.properties"],"is_ref":true}}},"tabular_sections":{"elmnts":{"name":"Элементы","synonym":"Элементы","tooltip":"","fields":{"elm":{"synonym":"Элемент","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","choice_type":{"path":["ТипЗначения"],"elm":0},"type":{"types":["cch.predefined_elmnts","cat.choice_params","cat.insert_bind","cat.formulas","cat.property_values","cat.params_links","cch.properties"],"is_ref":true}}}},"applying":{"name":"Применение","synonym":"Отделы","tooltip":"","fields":{"branch":{"synonym":"Отдел","multiline_mode":false,"tooltip":"","choice_groups_elm":"elm","type":{"types":["cat.branches"],"is_ref":true}}}}},"cachable":"meta","read_only":true}},"cacc":{},"bp":{},"tsk":{},"syns_1с":["arcCCW","CH","Абонент","Абоненты","Автор","Адрес","АдресБанка","АдресДоставки","АдресСтрокой","АдресЭП","Аксессуар","Активная","Алгоритм","Арт1Стеклопакет","Арт1ТолькоВертикальный","Арт2Стеклопакет","Арт2ТолькоВертикальный","Артикул","Атрибуты","БазоваяЕдиницаИзмерения","Банк","БанкДляРасчетов","Банки","БанковскиеСчета","БанковскиеСчетаКонтрагентов","БанковскиеСчетаОрганизаций","БанковскийСчет","БизнесПроцесс","БИКБанка","БИКБанкаДляРасчетов","Булево","Валюта","ВалютаВзаиморасчетов","ВалютаДенежныхСредств","ВалютаДокумента","ВалютаЦены","Валюты","ВариантАтрибутов","ВариантПереноса","ВариантПути","ВариантСмещения","ВариантУкорочения","ВариантыАтрибутовВставок","ВариантыПереносаОпераций","ВариантыСмещений","ВариантыУкорочений","ВариантыУравнивания","ВводПоСтроке","ВедениеВзаиморасчетов","ВедениеВзаиморасчетовПоДоговорам","Ведомый","ВедущаяПродукция","ВедущаяФормула","Ведущие","Ведущий","ВедущийМенеджер","ВедущийЭлемент","ВерсияДанных","Вес","Вид","ВидДвижения","ВидДляСписка","ВидДоговора","Виден","ВидЗатрат","ВидНоменклатуры","ВидОперации","ВидРабот","ВидРабочегоЦентра","ВидСкидкиНаценки","ВидСравнения","ВидСчета","ВидыДвиженийПриходРасход","ВидыДоговоровКонтрагентов","ВидыЗатрат","ВидыКонтактнойИнформации","ВидыНоменклатуры","ВидыПолейФормы","ВидыРабочихЦентров","ВидыТранспортныхСредств","Визуализация","ВключатьВНаименование","ВключатьВОписание","Владелец","ВладелецДополнительныхЗначений","Владельцы","ВремяИзменения","ВремяНачала","ВремяОкончания","ВремяСобытия","Всего","Вставка","Вставки","ВстроенныеФормулы","ВыборГруппИЭлементов","Выполнена","ВыпуклаяДуга","ВыравниваниеТекста","Высота","ВысотаМакс","ВысотаМин","ВысотаРучки","ВысотаРучкиМакс","ВысотаРучкиМин","ВысотаРучкиФиксирована","Глубина","Город","ГородБанка","ГородБанкаДляРасчетов","Готовность","ГрафикиДоставки","ГрафикРаботы","Группировка","ГруппыMDM","ГруппыФинансовогоУчетаНоменклатуры","ДаНет","Дата","ДатаДоставки","ДатаИзменения","ДатаНачала","ДатаОкончания","ДатаРождения","ДатаСобытия","Действие","ДействуетС","ДеловаяОбрезь","ДержатьРезервБезОплатыОграниченноеВремя","ДеятельностьПрекращена","Длина","ДлинаКода","ДлинаМакс","ДлинаМин","ДлинаНомера","ДлинаПроема","ДнейДоГотовности","ДнейОтГотовности","ДниНедели","ДоговорКонтрагента","ДоговорыКонтрагентов","Документ.Расчет","ДокументУдостоверяющийЛичность","Долгота","ДоменноеИмяСервера","Доп","ДополнительныеБазы","ДополнительныеРеквизиты","ДополнительныеРеквизитыИСведения","ДополнительныеСведения","ДопускаютсяНезамкнутыеКонтуры","ДопустимаяСуммаЗадолженности","ДопустимоеЧислоДнейЗадолженности","Доступен","ЕдиницаИзмерения","ЕдиницаПоКлассификатору","ЕдиницаХраненияОстатков","ЕдиницыИзмерения","Завершен","Завершение","ЗависимостиДополнительныхРеквизитов","Заголовок","Заказ","Заказной","ЗаказПокупателя","ЗаказПоставщику","Заказы","Закрыт","Закрыть","Запасы","Заполнения","ЗаполнятьОбязательно","Запуск","Значение","ЗначениеЗаполнения","Значения","ЗначенияПолей","ЗначенияПолейАдреса","ЗначенияСвойствОбъектов","ЗначенияСвойствОбъектовИерархия","Идентификатор","ИдентификаторПользователяИБ","Идентификаторы","ИдентификаторыОбъектовМетаданных","Иерархический","ИерархияГруппИЭлементов","Изделие","ИзОбрези","ИмяПредопределенныхДанных","Инд","Индекс","ИндивидуальныйПредприниматель","ИНН","ИнтеграцияАбоненты","ИнтеграцияВидыСравнений","ИнтеграцияКешСсылок","ИнтеграцияНастройкиОтчетовИСписков","ИнтеграцияОтделыАбонентов","ИнтеграцияСерверы","ИнтеграцияСостоянияТранспорта","ИнтеграцияТипВыгрузки","ИнтеграцияТипКеширования","ИнтеграцияТипСвёртки","Исключить","Исполнители","Исполнитель","ИспользованиеВедущих","ИспользованиеОбрези","ИсточникиЛидов","ИтогСебестоимость","Календари","КалендариGoogle","Календарь","Камеры","Касса","Кассы","КатегорииЗаказов","Категория","КлассификаторБанковРФ","КлассификаторЕдиницИзмерения","КлиентДилера","КлиентыДилеров","Ключ","Ключи","КлючиПараметров","КМарж","КМаржВнутр","КМаржМин","Код","КодАльфа2","КодАльфа3","КодИМНС","КодПоОКПО","КодЦветаДляСтанка","Количество","КоличествоСторон","Комментарий","КонечныйОстаток","Конструкции","Конструкция","КонтактнаяИнформация","КонтактныеЛица","КонтактныеЛицаКонтрагентов","Контрагент","Контрагенты","КонтролироватьСуммуЗадолженности","КонтролироватьЧислоДнейЗадолженности","КонцевыеКрепления","Координата","Координаты","КоординатыЗаполнений","КорректировкаРегистров","КоррСчет","КоррСчетБанка","КоррСчетБанкаДляРасчетов","Коэффициент","КоэффициентПотерь","КПП","Кратность","КратностьВзаиморасчетов","КрепитсяШтульп","Кривой","Курс","КурсВзаиморасчетов","КурсыВалют","ЛеваяПравая","Лид","Лиды","Листовые","Маржа","Марка","Масса","МассаМакс","МассаМин","МассаСтворкиМакс","МассаСтворкиМин","Материал","МатериалОперация","Материалы","МеждународноеСокращение","Менеджер","МестоРождения","МногострочныйРежим","МожноПоворачивать","Москитка","Москитки","МощностиРЦ","Мощность","Набор","НаборСвойств","НаборСвойствНоменклатура","НаборСвойствХарактеристика","НаборФурнитуры","НаборыДополнительныхРеквизитовИСведений","НазначениеЦветовойГруппы","НазначенияЦветовыхГрупп","Наименование","НаименованиеБанка","НаименованиеПолное","НаименованиеСокращенное","НалогообложениеНДС","Направление","НаправлениеОткрывания","НаправленияДоставки","НаправленияСортировки","НарядРЦ","НастройкиОткрывания","Наценка","НаценкаВнешн","НачальныйОстаток","Недействителен","НеполноеОткрывание","Нестандарт","Номенклатура","Номенклатура1","Номенклатура2","НоменклатурнаяГруппа","Номер","НомерВнутр","НомерЗвена","НомерКлиента","НомерКонтура","НомерОтдела","НомерСтроки","НомерСчета","НомерТелефона","НомерТелефонаБезКодов","ОбластиДоступаGoogle","Область","ОбратныйСервер","Обрезь","Объект","ОбъектДоступа","ОбъектыДоступа","Объем","ОбязательноеЗаполнение","ОграниченияСпецификации","ОГРН","ОкруглятьВБольшуюСторону","ОкруглятьКоличество","Описание","ОплатаОтПокупателяПлатежнойКартой","Организации","Организация","Ориентация","ОриентацияЭлемента","ОсновнаяВалюта","ОсновнаяСтатьяДвиженияДенежныхСредств","ОсновноаяКасса","ОсновноеКонтактноеЛицо","ОсновноеПредставлениеИмя","ОсновнойАдрес","ОсновнойБанковскийСчет","ОсновнойДоговорКонтрагента","ОсновнойМенеджерПокупателя","ОсновнойПроект","ОснЦвет","ОсьПоворота","Отбор","Ответственный","Отдел","ОтражатьВБухгалтерскомУчете","ОтражатьВНалоговомУчете","Отступы","Пара","Параметр","Параметры","ПараметрыВыбора","ПараметрыИзделия","ПараметрыОтбора","ПараметрыПрописиНаРусском","ПараметрыФурнитуры","ПарныйРаскрой","Партия","Период","ПериодыСмены","пзВизуализацияЭлементов","пзМаржинальныеКоэффициентыИСкидки","пзПараметрыПродукции","пзСоединения","пзФурнитура","пзЦвета","Планирование","ПланироватьДо","ПлатежноеПоручениеВходящее","ПлатежноеПоручениеИсходящее","ПлатежныйКалендарь","Плотность","Площадь","ПлощадьМакс","ПлощадьМин","ПлощадьППМ","Поворачивать","Поворот","ПоДоговоруВЦелом","Подразделение","ПодразделениеПроизводства","Подразделения","Подсказка","Подчиненый","ПоЗаказам","Покупатель","Пол","ПолноеИмя","Положение","ПоложениеСтворокПоИмпостам","ПоложениеЭлемента","ПоложенияЗаголовка","Получатель","ПолФизическихЛиц","Пользователи","Пользователь","ПометкаУдаления","ПорогОкругления","Порядок","ПорядокОкругления","Поставщик","ПоставщикиСВнешнимAPI","ПоступлениеТоваровУслуг","ПоСчетам","Потребность","ПоУмолчанию","Пояснение","Предоплата","ПредопределенныеЭлементы","Предопределенный","Представление","ПредставлениеИдентификатора","ПредставлениеОбъекта","ПредставлениеСписка","Префикс","Привязки","ПривязкиВставок","ПризнакиНестандартов","Применение","ПримененияКлючейПараметров","Принудительно","Приоритет","Приоритеты","Припуск","Приход","ПриходныйКассовыйОрдер","ПриязкаКоординат","Проведен","Продукция","Проект","Проекты","Происхождение","ПромежуточныйРайон","ПромежуточныйСклад","Пропорции","Процент","ПроцентПредоплаты","ПроцентСкидкиНаценки","ПроцентСкидкиНаценкиВнутр","Прочее","Прямоугольный","ПутьSVG","Работники","Работы","РабочиеЦентры","РабочийЦентр","Разделитель","Размер","Размер_B","РазмерМакс","РазмерМин","РазмерФальца","РазмерФурнПаза","Размеры","РазныеЦвета","Район","РайоныДоставки","Раскладка","Раскрой","РасположениеЭлементовУправления","Расход","РасходныйКассовыйОрдер","Расценка","Расчет","РасчетныйСчет","РасчетыСКонтрагентами","РасширенныйРежим","РасшифровкаПлатежа","РеализацияТоваровУслуг","Регион","РежимРедактированияВложенногоОбъекта","Реквизит","РеквизитДопУпорядочивания","Реквизиты","Родитель","Роли","Руководитель","РучкаНаСтороне","РядыСвязок","СвидетельствоДатаВыдачи","СвидетельствоКодОргана","СвидетельствоНаименованиеОргана","СвидетельствоСерияНомер","СВИФТБИК","СвойстваШаблонов","Свойство","Связи","СвязиПараметров","СвязиПараметровВыбора","СвязьПоТипу","Сделка","Себестоимость","Сервер","Синоним","Система","СистемыПрофилей","СистемыФурнитуры","Скидка","СкидкаВнешн","СкидкиНаценки","Склад","Склады","СКомиссионером","СКомитентом","Скрыть","Сложный","СлоиРаскладки","Служебный","Смена","Смены","Смещение","Событие","СобытиеПланирования","Согласие","Содержание","Соедин","СоединяемыеЭлементы","Соответствие","СоответствиеЦветов","СортировкаВЛистеКомплектации","Состав","Состояние","СостояниеТранспорта","СостоянияЗаданий","СостоянияЗаказовКлиентов","Сотрудник","Сотрудники","Спецификации","Спецификация","СпецификацияЗаполнений","Список","СПокупателем","СпособРасчетаКоличества","СпособРасчетаУгла","СпособУстановкиКурса","СпособыРасчетаКоличества","СпособыРасчетаУгла","СпособыУстановкиКурсаВалюты","СпособыУстановкиСпецификации","СПоставщиком","СрокДействия","Ссылка","СтавкаНДС","СтавкиНДС","СтандартнаяВысотаРучки","СтандартныйПериод","Старт","Стартован","СтатусыЗаказов","СтатьиДвиженияДенежныхСредств","СтатьиЗатрат","СтатьяДвиженияДенежныхСредств","СтатьяЗатрат","Створка","СтворкиВРазныхПлоскостях","Стоимость","Сторона","Сторона1","Сторона2","СторонаСоединения","СторонаЭлемента","СтороныСоединений","Страна","СтраныМира","СтраховойНомерПФР","стрНомер","Строка","СтрокаПодключения","СтруктурнаяЕдиница","Сумма","СуммаАвтоматическойСкидки","СуммаВзаиморасчетов","СуммаВключаетНДС","СуммаВнутр","СуммаДокумента","СуммаКонечныйОстаток","СуммаНачальныйОстаток","СуммаНДС","СуммаПриход","СуммаРасход","СуммаСНаценкой","СуммаУпр","Суффикс","СхемаДоставки","СчетУчета","ТаблицаРегистров","ТабличнаяЧасть","ТабличныеЧасти","ТекстКорреспондента","ТекстНазначения","ТекстоваяСтрока","Телефон","Телефоны","ТелефоныБанка","Тип","ТипВставки","ТипВставкиСтеклопакета","ТипДеления","ТипДенежныхСредств","ТипИсходногоДокумента","ТипНоменклатуры","ТиповойБлок","ТиповыеБлоки","ТипОптимизации","ТипОткрывания","ТипСоединения","ТипСчета","ТипЦен","ТипЦенВнутр","ТипЦенПрайс","ТипЦенСебестоимость","ТипыВставок","ТипыВставокСтеклопакета","ТипыДеленияРаскладки","ТипыДенежныхСредств","ТипыКонтактнойИнформации","ТипыЛидов","ТипыНалогообложенияНДС","ТипыНоменклатуры","ТипыОптимизацийРаскроя","ТипыОткрывания","ТипыРазмерныхЛиний","ТипыСобытий","ТипыСоединений","ТипыСтрокВЗаказ","ТипыСтруктурныхЕдиниц","ТипыСчетов","ТипыЦен","ТипыЦенНоменклатуры","ТипыЭлементов","ТипЭлемента","Товары","Толщина","ТолщинаМакс","ТолщинаМин","ТолькоДляПрямыхПрофилей","ТолькоДляЦенообразования","ТочкаМаршрута","ТранспортныеСредства","УголКГоризонту","УголКГоризонтуМакс","УголКГоризонтуМин","УголМакс","УголМин","УголРеза1","УголРеза2","УголШага","УдлинениеАрки","Узел1","Узел2","Укорочение","Упаковка","Управленческий","Условие","Услуги","УстанавливатьСпецификацию","УстановкаЦенНоменклатуры","Уточнение","УчитыватьНДС","Фаза","ФазыПланирования","ФизическиеЛица","ФизическоеЛицо","Финиш","Формула","ФормулаВнешн","ФормулаВнутр","ФормулаПродажа","ФормулаРасчетаКурса","ФормулаУсловия","Формулы","Фурнитура","ФурнитураЦвет","Характеристика","ХарактеристикаАксессуаров","ХарактеристикаНоменклатуры","ХарактеристикаПродукции","ХарактеристикиНоменклатуры","Хлыст","Цвет","Цвет1","Цвет2","ЦветRAL","Цвета","ЦветВРисовалке","ЦветИзнутри","Цветной","ЦветоваяГруппа","ЦветоЦеновыеГруппы","ЦветСнаружи","Цена","ЦенаВключаетНДС","ЦенаВнутр","ЦеноваяГруппа","ЦеновыеГруппы","Центрировать","ЦеныНоменклатуры","Число","ЧислоДнейРезерваБезОплаты","Шаблон","Шаблоны","Шаг","Ширина","ШиринаПилы","Широта","Штуки","ШтульпБезимпСоед","Экземпляр","Элемент","Элемент1","Элемент2","Элементы","Эскиз","ЭтапОтправки","ЭтапыОтправкиЗаказа","ЭтоАксессуар","ЭтоГруппа","ЭтоДополнительноеСведение","ЭтоНабор","ЭтоОсновнойЭлемент","ЭтоРаздвижка","ЭтоСоединение","ЭтоСтрокаЗаказа","ЭтоСтрокаНабора","ЭтоСтрокаОперации","ЭтоСтрокаСочетанияНоменклатур","ЭтоТехоперация","ЭтоУслуга","ЮрЛицо","ЮрФизЛицо","Ячейка","Ячейки"],"syns_js":["arc_ccw","changed","abonent","subscribers","author","address","bank_address","shipping_address","adresses_str","email_address","accessory","active","algorithm","art1glass","art1vert","art2glass","art2vert","article","attributes","base_unit","bank","settlements_bank","banks","bank_accounts","partner_bank_accounts","organization_bank_accounts","bank_account","buisness_process","bank_bic","settlements_bank_bic","boolean","currency","settlements_currency","funds_currency","doc_currency","price_currency","currencies","attrs_option","transfer_option","path_kind","offset_option","contraction_option","inset_attrs_options","transfer_operations_options","offset_options","contraction_options","align_types","input_by_string","mutual_settlements","mutual_contract_settlements","slave","leading_product","leading_formula","leadings","master","leading_manager","leading_elm","data_version","heft","kind","record_kind","list_view","contract_kind","shown","cost_kind","nom_kind","transactions_kind","work_kind","work_center_kind","charges_discounts_kind","comparison_type","account_kind","debit_credit_kinds","contract_kinds","costs_kinds","contact_information_kinds","nom_kinds","data_field_kinds","work_center_kinds","motor_vehicle_kinds","visualization","include_to_name","include_to_description","owner","extra_values_owner","owners","change_time","begin_time","end_time","event_time","altogether","inset","inserts","predefined_formulas","choice_groups_elm","completed","arc_available","text_aligns","height","hmax","hmin","h_ruch","handle_height_max","handle_height_min","fix_ruch","depth","city","bank_city","settlements_bank_city","readiness","delivery_schedules","worker_schedule","grouping","mdm_groups","nom_groups","yes_no","date","shipping_date","change_date","start_date","expiration_date","birth_date","event_date","action","act_from","biz_cuts","check_days_without_pay","activity_ceased","len","code_length","lmax","lmin","number_doc_len","aperture_len","days_to_execution","days_from_execution","week_days","contract","contracts","Документ.итРасчет","identification_document","longitude","server_domain_name","dop","ex_bases","extra_fields","properties","extra_properties","allow_open_cnn","allowable_debts_amount","allowable_debts_days","available","unit","qualifier_unit","storage_unit","nom_units","finished","completion","extra_fields_dependencies","caption","invoice","made_to_order","buyers_order","purchase_order","orders","closed","close","inventories","glasses","mandatory","launch","value","fill_value","values","values_fields","address_fields","property_values","property_values_hierarchy","identifier","user_ib_uid","ids","meta_ids","hierarchical","group_hierarchy","product","from_cut","predefined_name","icounter","ind","individual_entrepreneur","inn","abonents","comparison_types","integration_links_cache","scheme_settings","branches","servers","obj_delivery_states","unload_type","caching_type","reduce_type","exclude","executors","executor","use_master","use_cut","lead_src","first_cost_total","calendars","calendars_google","calendar","coffer","cashbox","cashboxes","order_categories","category","banks_qualifier","units","client_of_dealer","dealers_clients","key","keys","parameters_keys","marginality","marginality_internal","marginality_min","id","alpha2","alpha3","imns_code","okpo","machine_tools_clr","quantity","side_count","note","final_balance","constructions","cnstr","contact_information","contact_persons","contact_persons_partners","partner","partners","check_debts_amount","check_debts_days","end_mount","coordinate","coordinates","glass_coordinates","registers_correction","correspondent_account","bank_correspondent_account","settlements_bank_correspondent_account","coefficient","loss_factor","kpp","multiplicity","settlements_multiplicity","shtulp_fix_here","crooked","course","settlements_course","currency_courses","left_right","lead","leads","is_sandwich","margin","brand","weight","mmax","mmin","flap_weight_max","flap_weight_min","material","material_operation","materials","international_short","manager","birth_place","multiline_mode","can_rotate","mskt","mosquito","work_centers_performance","power","set","destination","dnom","dcharacteristic","furn_set","destinations","color_price_group_destination","color_price_group_destinations","name","bank_name","name_full","name_short","vat","direction","open_directions","delivery_directions","sort_directions","work_centers_task","open_tunes","extra_charge","extra_charge_external","initial_balance","invalid","partial_opening","nonstandard","nom","nom1","nom2","nom_group","number_doc","number_internal","chain","client_number","contour_number","number_division","row","account_number","phone_number","phone_without_codes","google_access_areas","area","back_server","cuts","obj","acl_obj","acl_objs","volume","mandatory_fields","specification_restrictions","ogrn","rounding_in_a_big_way","rounding_quantity","definition","credit_card_order","organizations","organization","orientation","orientations","main_currency","main_cash_flow_article","main_cashbox","primary_contact","main_presentation_name","main_address","main_bank_account","main_contract","buyer_main_manager","main_project","default_clr","rotation_axis","selection","responsible","branch","accounting_reflect","tax_accounting_reflect","offsets","pair","param","params","choice_params","product_params","selection_params","parameters_russian_recipe","furn_params","double_cut","part","period","work_shift_periodes","elm_visualization","margin_coefficients","production_params","cnns","furns","clrs","planning","plan_detailing","debit_bank_order","credit_bank_order","calendar_payments","density","s","smax","smin","coloration_area","rotate","rotated","by_entire_contract","department","department_manufactory","divisions","tooltip","has_owners","by_orders","is_buyer","sex","full_moniker","pos","flap_pos_by_impost","positions","label_positions","recipient","gender","users","user","_deleted","rounding_threshold","sorting","rounding_order","is_supplier","http_apis","purchase","by_invoices","demand","by_default","illustration","prepayment","predefined_elmnts","predefined","presentation","identifier_presentation","obj_presentation","list_presentation","prefix","bindings","insert_bind","nonstandard_attributes","applying","parameters_keys_applying","forcibly","priority","priorities","overmeasure","debit","debit_cash_order","bind_coordinates","posted","production","project","projects","origin","chain_area","chain_warehouse","proportions","rate","prepayment_percent","discount_percent","discount_percent_internal","others","is_rectangular","svg_path","workers","jobs","work_centers","work_center","delimiter","sz","sizeb","sz_max","sz_min","sizefaltz","sizefurn","sizes","varclr","delivery_area","delivery_areas","lay","cutting","elm_positions","credit","credit_cash_order","pricing","calc_order","current_account","invoice_payments","extended_mode","payment_details","selling","region","nested_object_editing_mode","field","sorting_field","fields","parent","roles","chief","handle_side","bundle_rows","certificate_date_issue","certificate_authority_code","certificate_authority_name","certificate_series_number","swift","template_props","property","links","params_links","choice_links","choice_type","trans","first_cost","server","synonym","sys","sys_profile","sys_furn","discount","discount_external","charges_discounts","warehouse","stores","with_commission_agent","with_committent","hide","difficult","lay_regions","ancillary","work_shift","work_shifts","offset","event","planning_event","approval","content","cnn","cnn_elmnts","conformity","clr_conformity","complete_list_sorting","composition","state","obj_delivery_state","task_states","buyers_order_states","employee","staff","specifications","specification","glass_specification","list","with_buyer","count_calc_method","angle_calc_method","course_installation_method","count_calculating_ways","angle_calculating_ways","course_installation_methods","specification_installation_methods","with_supplier","validity","ref","vat_rate","vat_rates","handle_height_base","standard_period","start","started","invoice_conditions","cash_flow_articles","cost_items","cash_flow_article","cost_item","flap","var_layers","cost","side","sd1","sd2","cnn_side","elm_side","cnn_sides","country","countries","pfr_number","number_str","string","connection_str","organizational_unit","amount","discount_amount_automatic","amount_mutual","vat_included","amount_internal","doc_amount","amount_final_balance","amount_initial_balance","vat_amount","amount_debit","amount_credit","amount_marged","amount_operation","suffix","delivery_scheme","account_accounting","registers_table","tabular_section","tabular_sections","correspondent_text","appointments_text","txt_row","phone","phone_numbers","bank_phone_numbers","type","insert_type","insert_glass_type","split_type","cash_flow_type","original_doc_type","nom_type","base_block","base_blocks","cutting_optimization_type","open_type","cnn_type","account_type","price_type","price_type_internal","price_type_sale","price_type_first_cost","inserts_types","inserts_glass_types","lay_split_types","cash_flow_types","contact_information_types","lead_types","vat_types","nom_types","cutting_optimization_types","open_types","sz_line_types","event_types","cnn_types","specification_order_row_types","structural_unit_types","account_types","price_types","nom_prices_types","elm_types","elm_type","goods","thickness","tmax","tmin","for_direct_profile_only","for_pricing_only","buisness_process_point","transport_means","angle_hor","ahmax","ahmin","amax","amin","alp1","alp2","step_angle","arc_elongation","node1","node2","contraction","packing","managerial","condition","services","set_specification","nom_prices_setup","specify","vat_consider","phase","planning_phases","individuals","individual_person","finish","formula","external_formula","internal_formula","sale_formula","course_calc_formula","condition_formula","formulas","furn","clr_furn","characteristic","accessory_characteristic","nom_characteristic","product_characteristic","characteristics","stick","clr","clr1","clr2","ral","colors","clr_str","clr_in","colored","clr_group","color_price_groups","clr_out","price","vat_price_included","price_internal","price_group","price_groups","do_center","nom_prices","number","days_without_pay","template","templates","step","width","saw_width","latitude","is_pieces","shtulp_available","specimen","elm","elm1","elm2","elmnts","outline","sending_stage","order_sending_stages","is_accessory","is_folder","is_extra_property","is_set","is_main_elm","is_sliding","is_cnn","is_order_row","is_set_row","is_procedure_row","is_nom_combinations_row","is_procedure","is_service","legal_person","individual_legal","cell","cells"]});

  (function(){
  const {MetaEventEmitter,EnumManager,CatManager,DocManager,DataProcessorsManager,ChartOfCharacteristicManager,ChartOfAccountManager,
    InfoRegManager,AccumRegManager,BusinessProcessManager,TaskManager,CatObj,DocObj,TabularSectionRow,DataProcessorObj,
    RegisterRow,BusinessProcessObj,TaskObj} = $p.constructor.classes;

  const _define = Object.defineProperties;


/**
* ### План видов характеристик ГруппыMDM
* Группы MDM
* @class CchMdm_groups
* @extends CatObj
* @constructor 
*/
class CchMdm_groups extends CatObj{
get mode(){return this._getter('mode')}
set mode(v){this._setter('mode',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get type(){const {type} = this._obj; return typeof type === 'object' ? type : {types: []}}
        set type(v){this._obj.type = typeof v === 'object' ? v : {types: []}}
get elmnts(){return this._getter_ts('elmnts')}
set elmnts(v){this._setter_ts('elmnts',v)}
get applying(){return this._getter_ts('applying')}
set applying(v){this._setter_ts('applying',v)}
}
$p.CchMdm_groups = CchMdm_groups;
class CchMdm_groupsElmntsRow extends TabularSectionRow{
get elm(){return this._getter('elm')}
set elm(v){this._setter('elm',v)}
}
$p.CchMdm_groupsElmntsRow = CchMdm_groupsElmntsRow;
class CchMdm_groupsApplyingRow extends TabularSectionRow{
get branch(){return this._getter('branch')}
set branch(v){this._setter('branch',v)}
}
$p.CchMdm_groupsApplyingRow = CchMdm_groupsApplyingRow;
$p.cch.create('mdm_groups');

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
get repl_server(){return this._getter('repl_server')}
set repl_server(v){this._setter('repl_server',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
get use(){return this._getter('use')}
set use(v){this._setter('use',v)}
get mode(){return this._getter('mode')}
set mode(v){this._setter('mode',v)}
get no_mdm(){return this._getter('no_mdm')}
set no_mdm(v){this._setter('no_mdm',v)}
get no_partners(){return this._getter('no_partners')}
set no_partners(v){this._setter('no_partners',v)}
get no_divisions(){return this._getter('no_divisions')}
set no_divisions(v){this._setter('no_divisions',v)}
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


  get _server() {
    const {owner, parent, server} = this;
    if(!server.empty()) {
      return server;
    }
    if(!parent.empty()) {
      return parent._server;
    }
    return owner.server;
  }

  db(cachable) {
    let {_data, _manager: {adapter, _owner: {$p}}, _server, owner, suffix} = this;
    if(!_data.dbs) {
      _data.dbs = {};
    }
    if(_data.dbs[cachable]) {
      return _data.dbs[cachable];
    }
    const name = `${_server.http_local || _server.http}${owner.id}_${cachable}_${suffix}`;
    const {auth} = adapter.remote.ram.__opts;
    const opts = {skip_setup: true, auth};
    _data.dbs[cachable] = new $p.classes.PouchDB(name, opts);
    return _data.dbs[cachable];
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
* ### Справочник пзЦвета
* Цвета
* @class CatClrs
* @extends CatObj
* @constructor 
*/
class CatClrs extends CatObj{
get ral(){return this._getter('ral')}
set ral(v){this._setter('ral',v)}
get machine_tools_clr(){return this._getter('machine_tools_clr')}
set machine_tools_clr(v){this._setter('machine_tools_clr',v)}
get clr_str(){return this._getter('clr_str')}
set clr_str(v){this._setter('clr_str',v)}
get clr_out(){return this._getter('clr_out')}
set clr_out(v){this._setter('clr_out',v)}
get clr_in(){return this._getter('clr_in')}
set clr_in(v){this._setter('clr_in',v)}
get grouping(){return this._getter('grouping')}
set grouping(v){this._setter('grouping',v)}
get predefined_name(){return this._getter('predefined_name')}
set predefined_name(v){this._setter('predefined_name',v)}
get parent(){return this._getter('parent')}
set parent(v){this._setter('parent',v)}


  inverted() {
    return this._manager.inverted(this);
  }

  // перед сохранением попытаемся заполнить grouping
  before_save() {
    const {clr_in, clr_out, grouping, is_folder, _manager} = this;
    const {cat, cch} = _manager._owner.$p;
    const owner = cch.properties.predefined('clr_grp');
    if(!is_folder && owner && !owner.empty()) {
      if(clr_in.empty() && clr_out.empty()) {
        if(grouping.empty()) {
          throw {status: 403, error: true, reason: 'Укажите значение группировки'};
        }
        return this;
      }
      this.set_grouping(cat.property_values.find_rows({owner}));
    }

    return this;
  }

  set_grouping(values) {
    const {clr_in, clr_out, _manager} = this;
    const white = _manager.predefined('Белый');
    const grp_in = clr_in === white ? 'Белый' : clr_in.grouping.name.split(' ')[0];
    const grp_out = clr_out === white ? 'Белый' : clr_out.grouping.name.split(' ')[0];
    if(!grp_in || grp_in === 'Нет' || !grp_out || grp_out === 'Нет') {
      this.grouping = values.find((v) => v.name === 'Нет');
    }
    else {
      this.grouping = values.find((v) => v.name.startsWith(grp_in) && v.name.endsWith(grp_out));
    }
  }

  save(post, operational, attachments, attr) {
    const {_manager} = this;
    if(!_manager.metadata().common) {
      return super.save(post, operational, attachments, attr);
    }
    const {job_prm, adapters: {pouch}} = _manager._owner.$p;
    const {remote: {meta}, props} = pouch;
    if(job_prm.is_node) {
      return super.save(false, false, null, {db: meta});
    }
    else {
      return pouch.fetch(props.path.replace(job_prm.local_storage_prefix, `common/_save/cat.clrs`), {
        method: 'POST',
        body: JSON.stringify(this),
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.error && (res.reason || res.message)) {
            throw res;
          }
          return this;
        });
    }
  }

  new_number_doc() {
    return super.new_number_doc('00');
  }}
$p.CatClrs = CatClrs;
class CatClrsManager extends CatManager {

  // ищет по цветам снаружи-изнутри
  by_in_out({clr_in, clr_out}) {
    const {wsql, utils: {blank}} = this._owner.$p;
    // скомпилированный запрос
    if(!this._by_in_out) {
      this._by_in_out = wsql.alasql.compile('select top 1 ref from ? where clr_in = ? and clr_out = ? and (not ref = ?)');
    }
    // ищем в справочнике цветов
    return this._by_in_out([this.alatable, clr_in.valueOf(), clr_out.valueOf(), blank.guid]);
  }

  // ищет инверсный
  inverted(clr) {
    if(clr.clr_in == clr.clr_out || clr.clr_in.empty() || clr.clr_out.empty()) {
      return clr;
    }
    const ares = this.by_in_out({clr_in: clr.clr_out, clr_out: clr.clr_in});
    return ares.length ? this.get(ares[0]) : clr;
  }

  // создаёт при необходимости составной цвет
  create_composite({clr_in, clr_out, with_inverted = true}) {
    const {job_prm, utils: {blank}} = this._owner.$p;
    if(!clr_in || clr_in == blank.guid || !clr_out || clr_out == blank.guid) {
      return Promise.reject(new TypeError('Для составного цвета не задан цвет снаружи или изнутри'));
    }
    clr_in = this.get(clr_in);
    clr_out = this.get(clr_out);
    const ares = this.by_in_out({clr_in, clr_out});
    const res = with_inverted ? this.create_composite({clr_in: clr_out, clr_out: clr_in, with_inverted: false}) : Promise.resolve();
    return res.then(() => (
      ares.length ?
        Promise.resolve(this.get(ares[0])) :
        this.create({
          clr_in,
          clr_out,
          name: `${clr_in.name} \\ ${clr_out.name}`,
          parent: job_prm.builder.composite_clr_folder
        })
    ))
      .then((clr) => clr._modified ? clr.save() : clr)
      .then((clr) => (with_inverted ? {clr, inverted: this.inverted(clr)} : clr));
  }

  // разовый сервисный метод
  patch_grouping() {
    const {cat, cch} = this._owner.$p;
    const owner = cch.properties.predefined('clr_grp');
    const values = cat.property_values.find_rows({owner});
    const service = this.predefined('СЛУЖЕБНЫЕ');
    const {meta} = this.adapter.remote;
    return meta.allDocs({
      include_docs: true,
      startkey: 'cat.clrs|',
      endkey: 'cat.clrs|\u0fff',
    })
      .then(({rows}) => {

        // сначала обработаем несоставные цвета
        for(const {doc} of rows) {
          for(const row of doc.rows) {
            const clr = this.get(row.ref);
            let {clr_in, clr_out, parent, grouping} = clr;
            if(row.is_folder || parent === service || clr.predefined_name) {
              continue;
            }
            if(clr_in.empty() && clr_out.empty()) {
              if(['Moeller','Верзалит','Дерево','Кристаллит','Данке','Лишние','Шелкография','ФСФ'].includes(parent.name)) {
                clr.grouping = values.find((v) => v.name === 'Нет');
              }
              else if(grouping.empty()) {
                clr.grouping = owner.calculated.execute({elm: {clr}});
                if(clr.grouping.name === 'Нет') {
                  if(parent.name === 'RAL') {
                    clr.grouping = values.find((v) => v.name.startsWith(parent.name) && v.name.endsWith(parent.name));
                  }
                  else if(parent.name === 'Ламинация ПВХ') {
                    clr.grouping = values.find((v) => v.name.startsWith('Renolit') && v.name.endsWith('Renolit'));
                  }
                  else {
                    console.log(clr.name);
                  }
                }
              }
            }
            row.grouping = clr.grouping.ref;
          }
        }

        // затем, составные
        let res = Promise.resolve();
        for(const {doc} of rows) {
          for(const row of doc.rows) {
            const clr = this.get(row.ref);
            let {clr_in, clr_out, parent, grouping} = clr;
            if(row.is_folder || parent === service || clr.predefined_name) {
              continue;
            }
            if(clr_in.empty() && clr_out.empty()) continue;
            if(clr_in.empty() && !clr_out.empty() || !clr_in.empty() && clr_out.empty()) {
              console.log(clr.name);
              continue;
            };

            clr.set_grouping(values);
            row.grouping = clr.grouping.ref;
          }
          res = res.then(() => meta.put(doc));
        }
        return res;
      });
  }
}
$p.cat.create('clrs', CatClrsManager, false);

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
get ips(){return this._getter('ips')}
set ips(v){this._setter('ips',v)}
get suffix(){return this._getter('suffix')}
set suffix(v){this._setter('suffix',v)}
get direct(){return this._getter('direct')}
set direct(v){this._setter('direct',v)}
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

  // при загрузке пользователей, извлекаем acl
  // load_array(aattr, forse) {
  //   const res = [];
  //   for (let aobj of aattr) {
  //     let obj = this.by_ref[aobj.ref];
  //     if(!aobj.acl_objs) {
  //       aobj.acl_objs = [];
  //     }
  //     const {acl} = aobj;
  //     delete aobj.acl;
  //     if(obj) {
  //       obj._mixin(aobj);
  //     }
  //     else {
  //       obj = new $p.CatUsers(aobj, this, true);
  //     }
  //
  //     const {_obj} = obj;
  //     if(_obj && !_obj._acl) {
  //       _obj._acl = acl;
  //       obj._set_loaded();
  //       res.push(obj);
  //     }
  //   }
  //   return res;
  // }

  // пользователей не выгружаем
  unload_obj() {	}

  // не надо пытаться
  find_rows_remote() {

  }

}
$p.cat.create('users', CatUsersManager, false);

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
get http_local(){return this._getter('http_local')}
set http_local(v){this._setter('http_local',v)}
get username(){return this._getter('username')}
set username(v){this._setter('username',v)}
get password(){return this._getter('password')}
set password(v){this._setter('password',v)}
get callbackurl(){return this._getter('callbackurl')}
set callbackurl(v){this._setter('callbackurl',v)}
get hv(){return this._getter('hv')}
set hv(v){this._setter('hv',v)}


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
get no_mdm(){return this._getter('no_mdm')}
set no_mdm(v){this._setter('no_mdm',v)}
get acl_objs(){return this._getter_ts('acl_objs')}
set acl_objs(v){this._setter_ts('acl_objs',v)}
get ex_bases(){return this._getter_ts('ex_bases')}
set ex_bases(v){this._setter_ts('ex_bases',v)}
get extra_fields(){return this._getter_ts('extra_fields')}
set extra_fields(v){this._setter_ts('extra_fields',v)}
get http_apis(){return this._getter_ts('http_apis')}
set http_apis(v){this._setter_ts('http_apis',v)}


  db(cachable) {
    const {job_prm: {server}, adapters: {pouch}} = this._manager._owner.$p;
    return server.abonents.length < 2 && !server.single_db ? pouch.remote[cachable] : this.server.db(this, cachable);
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
class CatAbonentsExtra_fieldsRow extends TabularSectionRow{
get property(){return this._getter('property')}
set property(v){this._setter('property',v)}
get value(){return this._getter('value')}
set value(v){this._setter('value',v)}
get txt_row(){return this._getter('txt_row')}
set txt_row(v){this._setter('txt_row',v)}
}
$p.CatAbonentsExtra_fieldsRow = CatAbonentsExtra_fieldsRow;
class CatAbonentsHttp_apisRow extends TabularSectionRow{
get is_supplier(){return this._getter('is_supplier')}
set is_supplier(v){this._setter('is_supplier',v)}
get partner(){return this._getter('partner')}
set partner(v){this._setter('partner',v)}
get server(){return this._getter('server')}
set server(v){this._setter('server',v)}
}
$p.CatAbonentsHttp_apisRow = CatAbonentsHttp_apisRow;
$p.cat.create('abonents');

/**
* ### Справочник ПоставщикиСВнешнимAPI
* Поставщики с внешним API
* @class CatHttp_apis
* @extends CatObj
* @constructor 
*/
class CatHttp_apis extends CatObj{
get nom(){return this._getter_ts('nom')}
set nom(v){this._setter_ts('nom',v)}
get params(){return this._getter_ts('params')}
set params(v){this._setter_ts('params',v)}
}
$p.CatHttp_apis = CatHttp_apis;
class CatHttp_apisNomRow extends TabularSectionRow{
get identifier(){return this._getter('identifier')}
set identifier(v){this._setter('identifier',v)}
get name(){return this._getter('name')}
set name(v){this._setter('name',v)}
get nom(){return this._getter('nom')}
set nom(v){this._setter('nom',v)}
get nom_characteristic(){return this._getter('nom_characteristic')}
set nom_characteristic(v){this._setter('nom_characteristic',v)}
get params(){return this._getter('params')}
set params(v){this._setter('params',v)}
}
$p.CatHttp_apisNomRow = CatHttp_apisNomRow;
class CatHttp_apisParamsRow extends TabularSectionRow{
get identifier(){return this._getter('identifier')}
set identifier(v){this._setter('identifier',v)}
get name(){return this._getter('name')}
set name(v){this._setter('name',v)}
get type(){return this._getter('type')}
set type(v){this._setter('type',v)}
get values(){return this._getter('values')}
set values(v){this._setter('values',v)}
}
$p.CatHttp_apisParamsRow = CatHttp_apisParamsRow;
$p.cat.create('http_apis');

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

/**
* ### Регистр сведений СхемаДоставки
* Схема доставки готовой продукции
* @class IregDelivery_scheme
* @extends RegisterRow
* @constructor 
*/
class IregDelivery_scheme extends RegisterRow{
get warehouse(){return this._getter('warehouse')}
set warehouse(v){this._setter('warehouse',v)}
get delivery_area(){return this._getter('delivery_area')}
set delivery_area(v){this._setter('delivery_area',v)}
get chain_warehouse(){return this._getter('chain_warehouse')}
set chain_warehouse(v){this._setter('chain_warehouse',v)}
get chain_area(){return this._getter('chain_area')}
set chain_area(v){this._setter('chain_area',v)}
get chain(){return this._getter('chain')}
set chain(v){this._setter('chain',v)}
}
$p.IregDelivery_scheme = IregDelivery_scheme;
class IregDelivery_schemeManager extends InfoRegManager {

  route({warehouse, delivery_area}) {
    const tmp = [];
    const res = [];
    this.find_rows({warehouse, delivery_area}, (row) => {
      tmp.push(row);
    });
    if(!tmp.length) {
      const err = new Error(`Нет доставки в район '${delivery_area.name}' со склада '${warehouse.name}'`);
      err.status = 400;
      throw err;
    }
    tmp.sort((a, b) => a.chain - b.chain);
    const prev = tmp[0];
    res.push({
      warehouse,
      chain_area: prev.chain_area,
      rstore: !prev.chain_warehouse.empty(),
      chain: prev.chain,
    });
    for(let i=1; i<tmp.length; i++) {
      const prev = tmp[i - 1];
      const curr = tmp[i];
      res.push({
        warehouse: prev.chain_warehouse,
        chain_area: curr.chain_area,
        rstore: !curr.chain_warehouse.empty(),
        chain: curr.chain,
      });
    }
    return res;
  }
}
$p.ireg.create('delivery_scheme', IregDelivery_schemeManager, false);

/**
* ### Регистр сведений ГрафикиДоставки
* Графики доставки по районам
* @class IregDelivery_schedules
* @extends RegisterRow
* @constructor 
*/
class IregDelivery_schedules extends RegisterRow{
get warehouse(){return this._getter('warehouse')}
set warehouse(v){this._setter('warehouse',v)}
get delivery_area(){return this._getter('delivery_area')}
set delivery_area(v){this._setter('delivery_area',v)}
get date(){return this._getter('date')}
set date(v){this._setter('date',v)}
get start(){return this._getter('start')}
set start(v){this._setter('start',v)}
}
$p.IregDelivery_schedules = IregDelivery_schedules;
class IregDelivery_schedulesManager extends InfoRegManager {

  constructor(...attr) {
    super(...attr);
    this.by_store = new Map();
  }

  /**
   * Ищет записи маршрута
   * @param warehouse
   * @param delivery_area
   * @return {Array}
   */
  runs({warehouse, delivery_area}) {
    const runs = this.by_store.get(warehouse).get(delivery_area);
    return runs || [];
  }

  /**
   * Дополняет маршрут доступными датами
   * @param route {Array}
   * @param start {Moment}
   * @return {*}
   */
  apply_schedule(route, start) {
    for (let i = 0; i < route.length; i++) {
      const curr = route[i];
      const prev = i > 0 && route[i - 1];
      const {warehouse} = curr;
      const delivery_area = curr.chain_area.empty() ? curr.delivery_area : curr.chain_area;
      if(prev) {
        const dates = new Set();
        for(const date of prev.runs) {
          const astart = moment(date).add(warehouse.assembly_days || 0, 'days');
          this.runs({warehouse, delivery_area}).forEach((date) => astart.isBefore(date) && dates.add(date));
          if(dates.size > 3) {
            break;
          }
        }
        curr.runs = Array.from(dates);
      }
      else {
        curr.runs = this.runs({warehouse, delivery_area}).filter((date) => start.isBefore(date));
      }
    }
    return route;
  }

  // переопределяем load_array
  load_array(aattr, forse) {
    const {utils: {moment}, job_prm, cat: {delivery_areas, stores}} = this._owner.$p;
    if(job_prm.is_common) {
      return;
    }
    const from = moment().subtract(3, 'days');
    const to = moment().add(3, 'months');
    const elmnts = [];
    for (const row of aattr) {
      // отрезаем старые и слишком новые даты
      const parts = row.ref.split('¶');
      if(parts[2]) {
        const mdate = moment(parts[2]);
        if(mdate.isValid() && mdate.isBetween(from, to)) {
          elmnts.push({
            warehouse: stores.get(parts[0]),
            area: delivery_areas.get(parts[1]),
            date: parts[2],
            start: row.start,
          });
        }
      }
    }

    // структурируем кеш
    const warehouses = new Map();
    for(const {warehouse, area, date, start} of elmnts) {
      let by_area = this.by_store.get(warehouse);
      if(!by_area) {
        by_area = new Map();
        this.by_store.set(warehouse, by_area);
      }
      let dates = by_area.get(area);
      if(!dates) {
        dates = [];
        by_area.set(area, dates);
      }
      const index = dates.indexOf(date);
      if(start) {
        index === -1 && dates.push(date);
      }
      else {
        index !== -1 && dates.splice(index, 1);
      }

      // структура для сортировки
      if(!warehouses.get(warehouse)) {
        warehouses.set(warehouse, new Set());
      }
      warehouses.get(warehouse).add(area);
    }

    // сортируем
    for(const [warehouse, areas] of warehouses) {
      const by_area = this.by_store.get(warehouse);
      for(const area of areas) {
        by_area.get(area).sort();
      }
    }

  }

}
$p.ireg.create('delivery_schedules', IregDelivery_schedulesManager, false);
})();
};