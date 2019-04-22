import * as jspb from "google-protobuf"

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Message extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getImagesList(): Array<string>;
  setImagesList(value: Array<string>): void;
  clearImagesList(): void;
  addImages(value: string, index?: number): void;

  getVideosList(): Array<string>;
  setVideosList(value: Array<string>): void;
  clearVideosList(): void;
  addVideos(value: string, index?: number): void;

  getTo(): string;
  setTo(value: string): void;

  getFrom(): string;
  setFrom(value: string): void;

  getLabelsMap(): jspb.Map<string, string>;
  clearLabelsMap(): void;

  getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreated(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasCreated(): boolean;
  clearCreated(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    id: string,
    content: string,
    imagesList: Array<string>,
    videosList: Array<string>,
    to: string,
    from: string,
    labelsMap: Array<[string, string]>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class TopicRequest extends jspb.Message {
  getTopic(): string;
  setTopic(value: string): void;

  getMsg(): Message | undefined;
  setMsg(value?: Message): void;
  hasMsg(): boolean;
  clearMsg(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TopicRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TopicRequest): TopicRequest.AsObject;
  static serializeBinaryToWriter(message: TopicRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TopicRequest;
  static deserializeBinaryFromReader(message: TopicRequest, reader: jspb.BinaryReader): TopicRequest;
}

export namespace TopicRequest {
  export type AsObject = {
    topic: string,
    msg?: Message.AsObject,
  }
}

