import { MessageInputAttachment } from './messageInputAttachment';

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
export enum MessageInputType {
  text = 'text',
  search = 'search',
  form = 'form',
  event = 'event',
}
/**
 * An input object that includes the input text.
 */
export interface MessageInput extends Record<string, any> {
  [key: string]: any;
  message_type: MessageInputType;
  text: string;
  attachments: Array<MessageInputAttachment>;
}
