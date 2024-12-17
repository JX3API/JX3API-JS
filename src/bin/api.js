import { Request } from "../utils/request";

/**
 * 创建一个新的 api 实例。
 *
 * @param {Object} options - 请求的选项。
 * @param {string} options.token - jx3api的token。
 * @param {string} options.ticket - 推栏ticket。
 * @param {string} [url="https://www.jx3api.com"] - 请求的 URL。默认为 "https://www.jx3api.com"。
 */
export class api extends Request {
  constructor(options, url = "https://www.jx3api.com") {
    super(options, url);
  }

  /***********
   * FREE API *
   ************/

  /**
   * 活动日历
   *
   * 今天、明天、后天、日常任务。
   * 只有星期三、星期五、星期六、星期日 才有美人画图，星期三、星期五 才有世界首领，若非活动时间不返回相关键与值。
   *
   * @param {string} [server] - 区服名称，查找该区服的记录。
   * @param {number} [num=0] - 预测时间，预测指定时间的日常，默认值为0（即当天），1为明天，以此类推。
   * @returns {Object} - 包含今天、明天、后天、日常任务的对象。
   */
  active_calendar(server, num = 0) {
    return this._axios.post("/data/active/calendar", {
      server: server,
      num: num,
    });
  }
  /**
   * 活动月历
   *
   * 预测每天的日常任务。
   * 只有星期三、星期五、星期六、星期日 才有美人画图，星期三、星期五 才有世界首领，若非活动时间不返回相关键与值。
   *
   * @param {number} [num=15] - 预测时间，预测指定时间范围内的活动，默认值为15（即当天），1为明天，以此类推。
   * @returns {Object} - 包含预测每天的日常任务的对象。
   */
  active_list_calendar(num = 15) {
    return this._axios.post("/data/active/list/calendar", {
      num: num,
    });
  }

  /**
   * 行侠事件
   *
   * 当前时间的楚天社/云从社进度。
   *
   * @param {number} [season=2] - 第几赛季，用于返回楚天社或云从社的判断条件，可选值：1-3。
   * @returns {Array<Object>} - 包含当前时间的楚天社/云从社进度的数组。
   */
  active_celebrity(season = 2) {
    return this._axios.post("/data/active/celebs", {
      season: season,
    });
  }

  /**
   * 科举试题
   *
   * 科举答案。
   *
   * @param {string} match - 科举试题，支持首字母，支持模糊查询。
   * @param {number} [limit=10] - 设置返回的数量，默认值为10。
   * @returns {Array<Object>} - 包含科举试题答案的数组。
   */
  exam_answer(match, limit = 10) {
    return this._axios.post("/data/exam/answer", {
      match: match,
      limit: limit,
    });
  }
  /**
   * 鲜花价格
   *
   * 家园鲜花最高价格线路。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string|null} [name=null] - 鲜花名称，查找该鲜花的记录。
   * @param {string|null} [map=null] - 地图名称，查找该地图的记录。
   * @returns {Object} - 鲜花价格。
   */
  home_flower(server, name = null, map = null) {
    return this._axios.post("/data/home/flower", {
      server: server,
      name: name,
      map: map,
    });
  }
  /**
   * 家园装饰
   *
   * 装饰详情。
   *
   * @param {string} name - 装饰名称，查找该装饰的详细记录。
   * @returns {Object} - 装饰详情。
   */
  home_furniture(name) {
    return this._axios.post("/data/home/furniture", {
      name: name,
    });
  }
  /**
   * 器物图谱
   *
   * 器物谱地图产出装饰。
   *
   * @param {string} name - 地图名称，查找该地图的家具。
   * @returns {Array<Object>} - 地图产出装饰。
   */
  home_travel(name) {
    return this._axios.post("/data/home/travel", {
      name: name,
    });
  }
  /**
   * 新闻资讯
   *
   * 官方最新公告及新闻。
   *
   * @param {number} [limit=10] - 单页数量，设置返回的数量，默认值为10。
   * @returns {Array<Object>} - 官方最新公告及新闻。
   */
  news_allnews(limit = 10) {
    return this._axios.post("/data/news/allnews", {
      limit: limit,
    });
  }
  /**
   * 维护公告
   *
   * 官方最新公告及新闻。
   *
   * @param {number} [limit=10] - 单页数量，设置返回的数量，默认值为10。
   * @returns {Array<Object>} - 官方最新公告及新闻。
   */
  news_announce(limit = 10) {
    return this._axios.post("/data/news/announce", {
      limit: limit,
    });
  }
  /**
   * 小药清单
   *
   * 推荐的小药清单。
   *
   * @param {string} name - 心法名称，查找该心法的记录。
   * @returns {Array<Object>} - 推荐的小药清单。
   */
  school_toxic(name) {
    return this._axios.post("/data/school/toxic", {
      name: name,
    });
  }
  /**
   * 搜索区服
   *
   * 简称搜索主次服务器。
   *
   * @param {string} name - 区服名称，查找该区服的记录。
   * @returns {Object} - 主次服务器信息。
   */
  server_master(name) {
    return this._axios.post("/data/server/master", {
      name: name,
    });
  }
  /**
   * 开服检查
   *
   * 服务器当前状态 [ 已开服/维护中 ]。
   * 未输入区服名称或输入错误区服名称时，将返回全部区服的状态数据，可用于开服监控(支持轮询请求)。
   * 刷新频率: 30 秒。
   *
   * @param {string|null} [server=null] - 区服名称，查找该区服的记录。
   * @returns {Object} - 服务器当前状态 [ 维护/正常/繁忙/爆满 ]。
   */
  server_check(server = null) {
    return this._axios.post("/data/server/check", {
      server: server,
    });
  }
  /**
   * 查看状态
   *
   * 服务器当前状态 [ 维护/正常/繁忙/爆满 ]。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 服务器当前状态 [ 维护/正常/繁忙/爆满 ]。
   */
  server_status(server) {
    return this._axios.post("/data/server/status", {
      server: server,
    });
  }
  /***********
   * VIP1 API*
   ***********/

  /**
   * 角色更新, 数据服务
   *
   * 自动更新角色信息。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} roleId - 角色数字标识，查找该标识的记录。
   * @returns {Object} - 角色信息。
   */
  save_detailed(server, roleId) {
    return this._axios.post("/data/save/detailed", {
      server: server,
      roleid: roleId,
    });
  }

  /**
   * 角色信息
   *
   * 角色详细信息。
   *
   * @param {string} server - 区服名称，查找目标区服的记录。
   * @param {string} name - 角色名称，查找目标角色的记录。
   * @returns {Object} - 角色详细信息。
   */
  role_detailed(server, name) {
    return this._axios.post("/data/role/detailed", {
      server: server,
      name: name,
    });
  }

  /**
   * 阵法效果
   *
   * 职业阵眼效果。
   *
   * @param {string} name - 心法名称，查找该心法的记录。
   * @returns {Object} - 职业阵眼效果。
   */
  school_matrix(name) {
    return this._axios.post("/data/school/matrix", {
      name: name,
    });
  }

  /**
   * 奇穴效果
   *
   * 奇穴详细效果。
   *
   * @param {string} name - 心法名称，查找该心法的记录。
   * @returns {Array<Object>} - 奇穴详细效果。
   */
  school_force(name) {
    return this._axios.post("/data/school/force", {
      name: name,
    });
  }

  /**
   * 技能效果
   *
   * 技能详细效果。
   *
   * @param {string} name - 心法名称，查找该心法的记录。
   * @returns {Array<Object>} - 技能详细信息。
   */
  school_skills(name) {
    return this._axios.post("/data/school/skills", {
      name: name,
    });
  }

  /**
   * 八卦帖子
   *
   * 禁止轮询，随机搜索贴吧: 818 / 616。
   *
   * @param {string} subclass - 帖子分类，可选范围：818、616、鬼网三、鬼网3、树洞、记录、教程、街拍、故事、避雷、吐槽、提问。
   * @param {string|null} [server=null] - 区服名称，查找该区服的记录。
   * @param {number} [limit=1] - 单页数量，单页返回的数量。
   * @returns {Array<Object>} - 该服务器随机选择的结果。
   */
  tieba_random(subclass, server = null, limit = 1) {
    return this._axios.post("/data/tieba/random", {
      subclass: subclass,
      server: server,
      limit: limit,
    });
  }
  /**
   * 装备属性
   *
   * 角色装备属性详情。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Object} - 装备属性详细信息。
   */
  role_attribute(server, name) {
    return this._axios.post("/data/role/attribute", {
      server: server,
      name: name,
    });
  }
  /**
   * 副本记录
   *
   * 角色副本记录。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Object} - 副本记录。
   */
  role_teamcdlist(server, name) {
    return this._axios.post("/data/role/teamcdlist", {
      server: server,
      name: name,
    });
  }
  /**
   * 奇遇记录
   *
   * 角色奇遇触发记录(不保证遗漏)。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Array<Object>} - 奇遇记录。
   */
  luck_adventure(server, name) {
    return this._axios.post("/data/luck/adventure", {
      server: server,
      name: name,
    });
  }
  /**
   * 奇遇统计
   *
   * 奇遇近期触发统计。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 奇遇名称，查找该奇遇的记录。
   * @param {number} [limit=20] - 单页数量，单页返回的数量，默认值 : 20。
   * @returns {Array<Object>} - 奇遇近期触发统计。
   */
  luck_statistical(server, name, limit = 20) {
    return this._axios.post("/data/luck/statistical", {
      server: server,
      name: name,
      limit: limit,
    });
  }
  /**
   * 全服统计
   *
   * 统计全服近期奇遇记录，不区分区服。
   *
   * @param {string} name - 奇遇名称，查找该奇遇的全服统计。
   * @param {number} [limit=20] - 单页数量，设置返回的数量，默认值: 20。
   * @returns {Array<Object>} - 全服近期奇遇记录。
   */
  luck_server_statistical(name, limit = 20) {
    return this._axios.post("/data/luck/server/statistical", {
      name: name,
      limit: limit,
    });
  }
  /**
   * 奇遇汇总
   *
   * 统计奇遇近期触发角色记录。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {number} [num=7] - 汇总时间，汇总指定天数内的记录，默认值: 7。
   * @returns {Array<Object>} - 奇遇触发记录。
   */
  luck_collect(server, num = 7) {
    return this._axios.post("/data/luck/collect", {
      server: server,
      num: num,
    });
  }
  /**
   * 成就百科
   *
   * 角色成就进度。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} role - 角色名称，查找该角色的记录。
   * @param {string} name - 成就/系列名称，查询该成就/系列的完成进度。
   * @returns {Array<Object>} - 角色成就进度。
   */
  role_achievement(server, role, name) {
    return this._axios.post("/data/role/achievement", {
      server: server,
      role: role,
      name: name,
    });
  }
  /**
   * 名剑战绩
   *
   * 角色近期战绩录。
   * 未输入比赛模式时，将返回推栏全部角色近期的比赛记录(推栏个人页面，会出现返回结果非指定角色数据)。
   * 根据 mode 参数请求返回不同的数据结构，最终数据以返回为准。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @param {number} [mode=0] - 比赛模式，查找该模式的记录。
   * @returns {Object} - 角色近期战绩记录。
   */
  match_recent(server, name, mode = 0) {
    return this._axios.post("/data/arena/recent", {
      server: server,
      name: name,
      mode: mode,
    });
  }
  /**
   * 名剑排行
   *
   * 角色近期战绩记录。
   *
   * @param {number} [mode=33] - 比赛模式，查找该模式的记录，默认值: 33。
   * @param {number} [limit=20] - 单页数量，设置返回的数量，默认值: 20。
   * @returns {Object} - 名剑排行。
   */
  match_awesome(mode = 33, limit = 20) {
    return this._axios.post("/data/arena/awesome", {
      mode: mode,
      limit: limit,
    });
  }
  /**
   * 名剑统计
   *
   * jjc前100门派分布。
   *
   * @param {number} [mode=33] - 比赛模式，查找该模式的记录，默认值: 33。
   * @returns {Array<Object>} - 角色近期战绩记录。
   */
  match_schools(mode = 33) {
    return this._axios.post("/data/arena/schools", {
      mode: mode,
    });
  }
  /**
   * 团队招募
   *
   * 团队招募信息。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} [keyword=null] - 关键字，模糊匹配记录，用`=关键字`完全匹配记录。
   * @param {number} [table=1] - 指定表记录，1=本服+跨服，2=本服，3=跨服，默认值: 1。
   * @returns {Object} - 团队招募信息。
   */
  member_recruit(server, keyword = null, table = 1) {
    return this._axios.post("/data/member/recruit", {
      server: server,
      keyword: keyword,
      table: table,
    });
  }
  /**
   * 师父列表
   *
   * 客户端师徒系统。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} [keyword=null] - 关键字，查找该关键字的记录。
   * @returns {Array<Object>} - 师父列表。
   */
  member_teacher(server, keyword = null) {
    return this._axios.post("/data/member/teacher", {
      server: server,
      keyword: keyword,
    });
  }
  /**
   * 徒弟列表
   *
   * 客户端师徒系统。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} [keyword=null] - 关键字，查找该字的记录。
   * @returns {Array<Object>} - 徒弟列表。
   */
  member_student(server, keyword = null) {
    return this._axios.post("/data/member/student", {
      server: server,
      keyword: keyword,
    });
  }
  /**
   * 沙盘信息
   *
   * 查看阵营沙盘信息。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 沙盘信息。
   */
  server_sand(server) {
    return this._axios.post("/data/server/sand", {
      server: server,
    });
  }
  /**
   * 阵营事件
   *
   * 全服阵营大事件。
   *
   * @param {number} [limit=100] - 单页数量，设置返回数量，默认值: 100。
   * @returns {Array<Object>} - 阵营事件详细列表。
   */
  server_event(limit = 100) {
    return this._axios.post("/data/server/event", {
      limit: limit,
    });
  }
  /**
   * 金币比例
   *
   * 金价比例信息。
   * 未输入区服名称或输入错误区服名称时，将返回全部区服的金币比例信息。
   *
   * @param {string|null} [server=null] - 区服名称，查找该区服的记录。
   * @param {number} [limit=10] - 单页数量，设置返回的数量，默认值: 10。
   * @returns {Array<Object>} - 金币比例信息。
   */
  trade_demon(server = null, limit = 10) {
    return this._axios.post("/data/trade/demon", {
      server: server,
      limit: limit,
    });
  }
  /**
   * 物品价格
   *
   * 黑市物品价格统计。
   *
   * @param {string} name - 外观名称，查找该外观的记录。
   * @returns {Object} - 物品价格。
   */
  trade_record(name) {
    return this._axios.post("/data/trade/record", {
      name: name,
    });
  }
  /**
   * 贴吧记录
   *
   * 来自贴吧的外观记录。
   *
   * @param {string} name - 外观名称，查找该外观的记录。
   * @param {string} [server="-"] - 区服名称，查找该区服的记录，默认值：``-`` 为全区服。
   * @param {number} [limit=1] - 单页数量，设置返回的数量，默认值：1。
   * @returns {Array<Object>} - 贴吧记录。
   */
  tieba_item_records(name, server = "-", limit = 1) {
    return this._axios.post("/data/tieba/item/records", {
      server: server,
      name: name,
      limit: limit,
    });
  }
  /**
   * 掉落统计
   *
   * 统计副本掉落的贵重物品。
   *
   * @param {string} name - 物品名称，查找该物品的记录。
   * @param {number} [limit=20] - 单页数量，设置返回的数量，默认值：`20`。
   * @returns {Array<Object>} - 贵重物品掉落记录。
   */
  valuables_statistical(name, limit = 20) {
    return this._axios.post("/data/valuables/statistical", {
      name: name,
      limit: limit,
    });
  }
  /**
   * 全服掉落
   *
   * 统计当前赛季副本掉落的特殊物品。
   *
   * @param {string} name - 物品名称，查找该物品的记录。
   * @param {number} [limit=30] - 单页数量，设置返回的数量，默认值 : ``30``。
   * @returns {Array<Object>} - 全服掉落物品记录。
   */
  valuables_server_statistical(name, limit = 30) {
    return this._axios.post("/data/valuables/server/statistical", {
      name: name,
      limit: limit,
    });
  }
  /**
   * 掉落汇总
   *
   * 统计副本掉落的特殊物品。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {number} [num=7] - 统计范围，默认值 ``7`` 天。
   * @returns {Array<Object>} - 掉落汇总信息。
   */
  valuables_collect(server, num = 7) {
    return this._axios.post("/data/valuables/collect", {
      server: server,
      num: num,
    });
  }
  /**
   * 诛恶事件
   *
   * 诛恶事件历史记录。
   * 不允许轮询。
   *
   * @returns {Array<Object>} - 诛恶事件历史记录。
   */
  server_antivice() {
    return this._axios.post("/data/server/antivice");
  }
  /**
   * 风云榜单
   *
   * 客户端战功榜与风云录。
   *
   * @param {string} table - 榜单类型。
   * @param {string} name - 榜单名称。
   * @param {string} server - 区服名称。
   * @returns {Array<Object>} - 风云榜单。
   */
  rank_statistical(table, name, server) {
    return this._axios.post("/data/rank/statistical", {
      table: table,
      name: name,
      server: server,
    });
  }
  /**
   * 全服榜单
   *
   * 客户端战功榜与风云录
   * [table] : 个人，[name] : [名士五十强 老江湖五十强 兵甲藏家五十强 名师五十强 阵营英雄五十强 薪火相传五十强 庐园广记一百强]；
   * [table] : 帮会，[name] : [浩气神兵宝甲五十强 恶人神兵宝甲五十强 浩气爱心帮会五十强 恶人爱心帮会五十强]；
   * [table] : 阵营，[name] : [赛季恶人五十强 赛季浩气五十强 上周恶人五十强 上周浩气五十强 本周恶人五十强 本周浩气五十强]；
   * [table] : 试炼，[name] : [万花 七秀 少林 纯阳 天策 五毒 唐门 明教 苍云 长歌 藏剑 丐帮 霸刀 蓬莱 凌雪 衍天 药宗 刀宗]；
   *
   * @param {string} table - 榜单类型。
   * @param {string} name - 榜单名称。
   * @returns {Array<Object>} - 全服榜单。
   */
  rank_server_statistical(table, name) {
    return this._axios.post("/data/rank/server/statistical", {
      table: table,
      name: name,
    });
  }
  /**
   * 资历榜单
   *
   * 游戏资历榜单。
   *
   * @param {string} [school="ALL"] - 门派简称，查找该心法的记录，默认值: "ALL"。
   * @param {string} [server="ALL"] - 区服名称，查找该区服的记录，默认值: "ALL"。
   * @returns {Array<Object>} - 游戏资历榜单。
   */
  school_rank_statistical(school = "ALL", server = "ALL") {
    return this._axios.post("/data/school/rank/statistical", {
      school: school,
      server: server,
    });
  }
  /**
   * 歪歪频道
   *
   * 服务器的统战歪歪。
   *
   * @param {string} [server=null] - 区服名称，查找该区服的记录。
   * @returns {Array<Object>} - 歪歪频道信息。
   */
  duowan_statistical(server = null) {
    return this._axios.post("/data/duowan/statistical", {
      server: server,
    });
  }

  /***********
   * VIP2 API*
   ***********/

  /**
   * 百战首领
   *
   * 本周百战异闻录刷新的首领以及特殊效果。
   *
   * @param {string} token - 站点标识，检查请求权限。
   * @returns {Object} - 本周百战异闻录刷新的首领以及特殊效果。
   */
  active_monster(token) {
    return this._axios.post("/data/active/monster", {
      token: token,
    });
  }
  /**
   * 的卢统计
   *
   * 客户端的卢刷新记录。
   *
   * @param {string} [server] - 区服名称，查找该区服的记录。
   * @returns {Array<Object>} - 包含的卢统计的数组对象。
   */
  horse_records(server) {
    return this._axios.post("/data/horse/records", {
      server: server,
    });
  }
  /**
   * 马场事件
   *
   * 客户端马场刷新记录。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 包含马场刷新记录的对象。
   */
  horse_event(server) {
    return this._axios.post("/data/horse/event", {
      server: server,
    });
  }

  /***********
   * VRF API *
   ***********/

  /**
   * 智障聊天
   *
   * @param {string} name - 机器人的名称。
   * @param {string} text - 聊天的完整内容。
   * @returns {Object} - 聊天的详细内容。
   */
  chat_mixed(name, text) {
    return this._axios.post("/data/chat/mixed", {
      name: name,
      text: text,
    });
  }
  /**
   * 腾讯音乐
   *
   * 搜索腾讯音乐歌曲编号。
   *
   * @param {string} name - 歌曲名称，查找歌曲编号。
   * @returns {Array<Object>} - 腾讯音乐编号信息。
   */
  music_tencent(name) {
    return this._axios.post("/data/music/tencent", {
      name: name,
    });
  }

  /**
   * 网易音乐
   *
   * 搜索网易云音乐歌曲编号。
   *
   * @param {string} name - 歌曲名称，查找该歌曲的编号。
   * @returns {Array<Object>} - 网易云音乐歌曲编号。
   */
  music_netease(name) {
    return this._axios.post("/data/music/netease", {
      name: name,
    });
  }
  /**
   * 酷狗音乐
   *
   * 搜索酷狗音乐歌曲编号。
   *
   * @param {string} name - 歌曲名称，查找该歌曲的编号。
   * @returns {Object} - 酷狗音乐歌曲信息。
   */
  music_kugou(name) {
    return this._axios.post("/data/music/kugou", {
      name: name,
    });
  }
  /**
   * 骗子记录
   *
   * 搜索贴吧的行骗记录。
   *
   * @param {number} uin - 用户QQ号，查找是否存在行骗记录。
   * @returns {Object} - 骗子记录。
   */
  fraud_detail(uin) {
    return this._axios.post("/data/fraud/detailed", {
      uin: uin,
    });
  }
  /**
   * 成语接龙
   *
   * 校对成语并返回相关成语。
   *
   * @param {string} name - 查找对应词语。
   * @returns {Object} - 成语及其信息。
   */
  idiom_solitaire(name) {
    return this._axios.post("/data/idiom/solitaire", {
      name: name,
    });
  }
  /**
   * 撩人骚话
   *
   * 万花门派骚话。
   *
   * @returns {Object} - 骚话。
   */
  saohua_random() {
    return this._axios.post("/data/saohua/random");
  }
  /**
   * 舔狗日记
   *
   * 召唤一条舔狗日记。
   *
   * @returns {Object} - 舔狗日记。
   */
  saohua_content() {
    return this._axios.post("/data/saohua/content");
  }
  /**
   * 语音合成
   *
   * 阿里云语音合成（TTS）。
   *
   * @param {string} appkey - 阿里云身份识别。
   * @param {string} access - 阿里云身份识别。
   * @param {string} secret - 阿里云身份识别。
   * @param {string} text - 合成的内容。
   * @param {string} [voice="Aitong"] - 发音人。
   * @param {string} [format="mp3"] - 编码格式。
   * @param {number} [sample_rate=16000] - 采样率。
   * @param {number} [volume=50] - 音量。
   * @param {number} [speech_rate=0] - 语速。
   * @param {number} [pitch_rate=0] - 音调。
   * @returns {Object} - 语音合成信息。
   */
  sound_converter({
    appkey,
    access,
    secret,
    text,
    voice = "Aitong",
    format = "mp3",
    sample_rate = 16000,
    volume = 50,
    speech_rate = 0,
    pitch_rate = 0,
  }) {
    return this._axios.post("/data/sound/converter", {
      appkey: appkey,
      access: access,
      secret: secret,
      text: text,
      voice: voice,
      format: format,
      sample_rate: sample_rate,
      volume: volume,
      speech_rate: speech_rate,
      pitch_rate: pitch_rate,
    });
  }

  /**
   * 角色精耐
   *
   * 查询指定角色的游戏精力、耐力以及技能等级和相关信息。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Object} - 角色精耐与技能等级信息。
   */
  role_monster(server, name) {
    return this._axios.post("/data/role/monster", {
      server: server,
      name: name,
    });
  }

  /**
   * 角色在线
   *
   * 查询指定角色的在线状态。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Object} - 角色在线状态信息。
   */
  role_online_status(server, name) {
    return this._axios.post("/data/role/online/status", {
      server: server,
      name: name,
    });
  }

  /**
   * 技能记录
   *
   * 查询指定技能的历史记录。
   *
   * @param {string} name - 技能名称，查找该技能的记录。
   * @returns {Object} - 技能历史记录信息。
   */
  skills_records(name) {
    return this._axios.post("/data/skills/records", {
      name: name,
    });
  }

  /**
   * 展示随机
   *
   * 随机展示信息。
   *
   * @param {string} name - 展示类型，查找该类型的记录。
   * @returns {Object} - 随机展示信息。
   */
  show_random(name) {
    return this._axios.post("/data/show/random", {
      name: name,
    });
  }

  /**
   * 展示记录
   *
   * 查询展示历史记录。
   *
   * @param {string} name - 展示类型，查找该类型的记录。
   * @returns {Object} - 展示历史记录信息。
   */
  show_records(name) {
    return this._axios.post("/data/show/records", {
      name: name,
    });
  }

  /**
   * 展示卡片
   *
   * 查询展示卡片信息。
   *
   * @param {string} name - 展示类型，查找该类型的记录。
   * @returns {Object} - 展示卡片信息。
   */
  show_card(name) {
    return this._axios.post("/data/show/card", {
      name: name,
    });
  }

  /**
   * 展示缓存
   *
   * 查询展示缓存信息。
   *
   * @param {string} name - 展示类型，查找该类型的记录。
   * @returns {Object} - 展示缓存信息。
   */
  show_cache(name) {
    return this._axios.post("/data/show/cache", {
      name: name,
    });
  }

  /**
   * 服务器领袖
   *
   * 查询服务器领袖信息。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 服务器领袖信息。
   */
  server_leader(server) {
    return this._axios.post("/data/server/leader", {
      server: server,
    });
  }

  /**
   * 资历排行
   *
   * 查询门派资历排行信息。
   *
   * @param {string} school - 门派名称，查找该门派的记录。
   * @returns {Object} - 门派资历排行信息。
   */
  school_seniority(school) {
    return this._axios.post("/data/school/seniority", {
      school: school,
    });
  }

  /**
   * 保存周
   *
   * 保存每周活动日历。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 保存结果。
   */
  save_week_calendar(server) {
    return this._axios.post("/data/save/week/calendar", {
      server: server,
    });
  }

  /**
   * 保存日历
   *
   * 保存客户端日历。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @returns {Object} - 保存结果。
   */
  save_client_calendar(server) {
    return this._axios.post("/data/save/client/calendar", {
      server: server,
    });
  }

  /**
   * 交搜索
   *
   * 统计外观物品的模糊搜索结果。
   *
   * @param {string} name - 物品名称，模糊查询与该名称匹配的物品信息。
   * @returns {Array<Object>} - 物品搜索结果列表。
   */
  trade_search(name) {
    return this._axios.post("/data/trade/search", {
      name: name,
    });
  }

  /**
   * 交易市场
   *
   * 查询指定物品的交易行价格信息。
   *
   * @param {string} server - 目标服务器名称用于查询该服务器的交易数据。
   * @param {string} name - 物品名称，用于查询目标物品的价格信息，支持模糊搜索。
   * @returns {Array<Object>} - 物品交易价格信息。
   */
  trade_market(server, name) {
    return this._axios.post("/data/trade/market", {
      server: server,
      name: name,
    });
  }

  /**
   * 拍卖记录
   *
   * 查询阵营拍卖的记录。
   *
   * @param {string} server - 指定目标区服，获取该区服的拍卖记录。
   * @param {string} [name] - 物品名称，支持模糊搜索，默认为空
   * @param {number} [limit=50] - 限制返回的记录数量，默认值为 50，可选范围为 1-100。
   * @returns {Array<Object>} - 拍卖记录列表。
   */
  auction_records(server, name, limit = 50) {
    return this._axios.post("/data/auction/records", {
      server: server,
      name: name,
      limit: limit,
    });
  }

  /**
   * 赤兔记录
   *
   * 获取今天刷新出的赤兔幼驹相关信息。
   *
   * @returns {Array<Object>} - 赤兔记录列表。
   */
  chitu_records() {
    return this._axios.post("/data/chitu/records");
  }

  /**
   * 挂件查询
   *
   * 查询指定挂件的效果及获取方式。
   *
   * @param {string} name - 指定挂件名称，查询目标挂件的相关信息。
   * @returns {Array<Object>} - 挂件信息列表。
   */
  archived_pendant(name) {
    return this._axios.post("/data/archived/pendant", {
      name: name,
    });
  }

  /**
   * 宠物事件
   *
   * 查询宠物的出现录。
   *
   * @param {string} server - 指定目标���服，获取该区服的宠物数据。
   * @returns {Array<Object>} - 宠物事件记录列表。
   */
  archived_pet_event(server) {
    return this._axios.post("/data/archived/petEvent", {
      server: server,
    });
  }

  /**
   * 活动预告
   *
   * 获取下一次扶摇九天活动开启的时间。
   *
   * @param {string} [server] - 指定目标区服，可获取该区服的活动数据。默认为空，表示获取所有服务器的数据。
   * @returns {Array<Object>} - 活动预告信息列表。
   */
  active_next_event(server) {
    return this._axios.post("/data/active/next/event", {
      server: server,
    });
  }

  /**
   * 未完成奇遇
   *
   * 查询指定角色的未触发奇遇列表。
   *
   * @param {string} server - 指定目标区服，查询该区服的相关奇遇记录。
   * @param {string} name - 指定角色名称，查询该角色的未触发奇遇。
   * @param {string} [ticket] - 推栏标识，用于检查奇遇记录的完整性；若未提供或输入错误，则不检查数据的完整性。
   * @returns {Array<string>} - 未触发奇遇列表。
   */
  luck_unfinished(server, name, ticket) {
    return this._axios.post("/data/luck/unfinished", {
      server: server,
      name: name,
      ticket: ticket,
    });
  }

  /**
   * 最近奇遇
   *
   * 查询指定区服中近期触发的奇遇记录。
   *
   * @param {string} server - 指定目标区服，查询该区服的奇遇记录。
   * @returns {Array<Object>} - 近期奇遇记录列表。
   */
  luck_recent(server) {
    return this._axios.post("/data/luck/recent", {
      server: server,
    });
  }

  /**
   * 全服奖励
   *
   * 统计当前赛季副本中掉落的特殊物品信息。
   *
   * @param {string} name - 指定物品名称，查询目标物品的赛季掉落记录。
   * @param {number} [limit=30] - 限制返回记录的数量，默认值为 30，可选范围为 1-100。
   * @returns {Array<Object>} - 赛季掉落记录列表。
   */
  reward_server_statistical(name, limit = 30) {
    return this._axios.post("/data/reward/server/statistical", {
      name: name,
      limit: limit,
    });
  }

  /**
   * 奖励统计
   *
   * 统计副本掉落的贵重物品记录。
   *
   * @param {string} server - 指定目标区服，查询该区服的物品掉落记录。
   * @param {string} name - 指定物品名称，查询该物品的掉落记录。
   * @param {number} [limit=20] - 限制返回记录的数量，默认值为 20，可选范围为 1-100。
   * @returns {Array<Object>} - 物品掉落记录列表。
   */
  reward_statistical(server, name, limit = 20) {
    return this._axios.post("/data/reward/statistical", {
      server: server,
      name: name,
      limit: limit,
    });
  }

  /**
   * 马场信息
   *
   * 查询指定区服的马场里即将刷新的马驹信息。
   *
   * @param {string} server - ��定目标区服，查询该区服的相关马驹刷新信息。
   * @returns {Object} - 马场刷新信息。
   */
  horse_ranch(server) {
    return this._axios.post("/data/horse/ranch", {
      server: server,
    });
  }

  /**
   * 全服排行
   *
   * 查询客户端战功榜和风云录，包括个人、帮会、阵营以及试炼相关榜单的详细信息。
   *
   * @param {string} table - 榜单类型，可选值：个人、帮会、阵营、试炼。
   * @param {string} name - 榜单名称，需与table类型关联。
   * @returns {Array<Object>} - 排行榜信息列表。
   */
  rank_server_statistical(table, name) {
    return this._axios.post("/data/rank/server/statistical", {
      table: table,
      name: name,
    });
  }

  /**
   * 排行统计
   *
   * 查询客户端战功榜和风云录，包括个人、帮会、阵营以及试炼相关榜单的详细信息。
   *
   * @param {string} server - 指定目标区服，查询该区服的榜单信息。
   * @param {string} table - 榜单类型，可选值：个人、帮会、阵营、试炼。
   * @param {string} name - 榜单名称，需与table类型关联。
   * @returns {Array<Object>} - 排行榜信息列表。
   */
  rank_statistical(server, table, name) {
    return this._axios.post("/data/rank/statistical", {
      server: server,
      table: table,
      name: name,
    });
  }

  /**
   * 烟花记录
   *
   * 烟花赠送与接收的历史记录，不保证遗漏。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 角色名称，查找该角色的记录。
   * @returns {Array<Object>} - 包含烟花记录的数组对象。
   */
  fireworks_record(server, name) {
    return this._axios.post("/data/fireworks/records", {
      server: server,
      name: name,
    });
  }

  /**
   * 烟花统计
   *
   * 统计烟花记录。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {string} name - 烟花名称，查找该烟花的记录。
   * @param {number} [limit=20] - 单页数量，设置返回的数量，默认为20。
   * @returns {Array<Object>} - 包含烟花统计记录的数组对象。
   */
  fireworks_statistical(server, name, limit = 20) {
    return this._axios.post("/data/fireworks/statistical", {
      server: server,
      name: name,
      limit: limit,
    });
  }

  /**
   * 烟花汇总
   *
   * 汇总烟花记录。
   *
   * @param {string} server - 区服名称，查找该区服的记录。
   * @param {number} [num=7] - 统计时间，默认为7天。
   * @returns {Array<Object>} - 包含烟花汇总记录的数组对象。
   */
  fireworks_collect(server, num = 7) {
    return this._axios.post("/data/fireworks/collect", {
      server: server,
      num: num,
    });
  }

  /**
   * 烟花排行
   *
   * 烟花赠送与接收的榜单。
   *
   * @param {string} server - 区服名称，查找该服的记录。
   * @param {string} column - 可选范围：['sender', 'recipient', 'name']。
   * @param {number} this_time - 统计开始的时间，与结束的时间不得超过3个月。
   * @param {number} that_time - 统计结束的时间，与开始的时间不得超过3个月。
   * @returns {Array<Object>} - 包含烟花排行信息的数组对象。
   */
  fireworks_rank_statistical(server, column, this_time, that_time) {
    return this._axios.post("/data/fireworks/rank/statistical", {
      server: server,
      column: column,
      this_time: this_time,
      that_time: that_time,
    });
  }

  /**
   * PVE事件记录
   *
   * 查询PVE事件的历史记录。
   *
   * @param {string} server - 指定目标区服获取该区服的PVE事件数据。
   * @returns {Array<Object>} - PVE事件记录列表。
   */
  archived_pve_event(server) {
    return this._axios.post("/data/archived/pveEvent", {
      server: server,
    });
  }
}
