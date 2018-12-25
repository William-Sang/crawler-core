/**
 * 爬虫配置
 */
interface Config {
    startUrls: string[];
    pageRules: PageRule[];
}

type PageAction = (DomAction | FieldExtractor | GroupFieldExtractor | OnConditionAction)[];


/**
 * 页面操作
 * 1. dom 操作： 点击、填写、选择等
 * 2. 信息提取（单个、群组）
 * 3. 条件配置
 */
interface PageRule {
    urlPattern: string;
    pageActions: PageAction;
}

/**
 * DOM 选择器：所有页面行为都需要集成
 */
interface ContentSelector {
    /**
     * 选择器类别: 目前只有两种
     * TODO 改成枚举类
     */
    selectorType: "XPATH" | "CSS";
    /**
     * 选择器语法
     */
    selector: string;
}

/**
 * 对 DOM 的操作
 */
interface DomAction extends ContentSelector {
    // TODO 改成枚举类
    actionType: "click" | "select" | "waitFor" | "extract"
}

/**
 * 满足某些条件的操作
 */
interface OnConditionAction extends ContentSelector{
    // TODO 问题：根据 ContentSelector 直接提取属性值？
    // 应该分成两种：1. DOM 可以条件 2. 属性条件
    condition: "exist" | "isClickAble" | "contains" | "equals";
    property: string;
    argument: string;

    contentAction: PageAction;
}

interface FieldExtractor extends ContentSelector {
    /**
     * 抓取某个属性
     */
    property: string;
    /**
     * 保存的字段名称
     */
    fieldName: string;
    /**
     * 简单的字符串处理
     */
    format: Format[];
    /**
     * 是否当做 URL 种子继续爬取
     */
    isSeedUrl: boolean;
    /**
     * 是否是图片
     */
    isImage: boolean;
}
interface GroupFieldExtractor {
    /**
     * 顶层字段
     */
    fieldExtractor: FieldExtractor[];
    /**
     * array 类字段解析
     */
    groupSelector: ContentSelector;
    /**
     * 保存时，该组的字段名称（一个页面当做一个文档保存单位）
     */
    groupNamespace: string;
    groupFieldExtractor: FieldExtractor[];
}

/**
 * 字符串处理函数
 */
interface Format {
    method: string;
}