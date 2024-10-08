/**
 * Procode Endpoints for Conversational Skills
 * This document describes the following APIs that will be implemented by a watsonx Assistant client, and consumed by the watsonx Assistant team in order to enable the objectives set forth by the Conversational Skills Mission.
 *
 * OpenAPI spec version: 1.0.11
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Built-in system properties that apply to all skills used by the assistant.
 */
export interface MessageContextGlobalSystem {
  /**
   * The user time zone. The assistant uses the time zone to correctly resolve relative time references.
   */
  timezone?: string;
  /**
   * A string value that identifies the user who is interacting with the assistant. The client must provide a unique identifier for each individual end user who accesses the application. For user-based plans, this user ID is used to identify unique users for billing purposes. This string cannot contain carriage return, newline, or tab characters. If no value is specified in the input, **user_id** is automatically set to the value of **context.global.session_id**.  **Note:** This property is the same as the **user_id** property at the root of the message body. If **user_id** is specified in both locations in a message request, the value specified at the root is used.
   */
  user_id?: string;
  /**
   * A counter that is automatically incremented with each turn of the conversation. A value of 1 indicates that this is the the first turn of a new conversation, which can affect the behavior of some skills (for example, triggering the start node of a dialog).
   */
  turn_count?: number;
  /**
   * The language code for localization in the user input. The specified locale overrides the default for the assistant, and is used for interpreting entity values in user input such as date values. For example, `04/03/2018` might be interpreted either as April 3 or March 4, depending on the locale.   This property is included only if the new system entities are enabled for the skill.
   */
  locale?: MessageContextGlobalSystem.LocaleEnum;
  /**
   * The base time for interpreting any relative time mentions in the user input. The specified time overrides the current server time, and is used to calculate times mentioned in relative terms such as `now` or `tomorrow`. This can be useful for simulating past or future times for testing purposes, or when analyzing documents such as news articles.  This value must be a UTC time value formatted according to ISO 8601 (for example, `2021-06-26T12:00:00Z` for noon UTC on 26 June 2021).  This property is included only if the new system entities are enabled for the skill.
   */
  reference_time?: string;
  /**
   * The time at which the session started. With the stateful `message` method, the start time is always present, and is set by the service based on the time the session was created. With the stateless `message` method, the start time is set by the service in the response to the first message, and should be returned as part of the context with each subsequent message in the session.  This value is a UTC time value formatted according to ISO 8601 (for example, `2021-06-26T12:00:00Z` for noon UTC on 26 June 2021).
   */
  session_start_time?: string;
  /**
   * An encoded string that represents the configuration state of the assistant at the beginning of the conversation. If you are using the stateless `message` method, save this value and then send it in the context of the subsequent message request to avoid disruptions if there are configuration changes during the conversation (such as a change to a skill the assistant uses).
   */
  state?: string;
  /**
   * For internal use only.
   */
  skip_user_input?: boolean;
}
export namespace MessageContextGlobalSystem {
  export type LocaleEnum =
    | 'en-us'
    | 'en-ca'
    | 'en-gb'
    | 'ar-ar'
    | 'cs-cz'
    | 'de-de'
    | 'es-es'
    | 'fr-fr'
    | 'it-it'
    | 'ja-jp'
    | 'ko-kr'
    | 'nl-nl'
    | 'pt-br'
    | 'zh-cn'
    | 'zh-tw';
  export const LocaleEnum = {
    EnUs: 'en-us' as LocaleEnum,
    EnCa: 'en-ca' as LocaleEnum,
    EnGb: 'en-gb' as LocaleEnum,
    ArAr: 'ar-ar' as LocaleEnum,
    CsCz: 'cs-cz' as LocaleEnum,
    DeDe: 'de-de' as LocaleEnum,
    EsEs: 'es-es' as LocaleEnum,
    FrFr: 'fr-fr' as LocaleEnum,
    ItIt: 'it-it' as LocaleEnum,
    JaJp: 'ja-jp' as LocaleEnum,
    KoKr: 'ko-kr' as LocaleEnum,
    NlNl: 'nl-nl' as LocaleEnum,
    PtBr: 'pt-br' as LocaleEnum,
    ZhCn: 'zh-cn' as LocaleEnum,
    ZhTw: 'zh-tw' as LocaleEnum,
  };
}
