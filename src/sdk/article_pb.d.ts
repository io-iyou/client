import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Article extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  getVideo(): string;
  setVideo(value: string): void;

  getOwner(): string;
  setOwner(value: string): void;

  getHiddensList(): Array<number>;
  setHiddensList(value: Array<number>): void;
  clearHiddensList(): void;
  addHiddens(value: number, index?: number): void;

  getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreated(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasCreated(): boolean;
  clearCreated(): void;

  getLabelsMap(): jspb.Map<string, string>;
  clearLabelsMap(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Article.AsObject;
  static toObject(includeInstance: boolean, msg: Article): Article.AsObject;
  static serializeBinaryToWriter(message: Article, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Article;
  static deserializeBinaryFromReader(message: Article, reader: jspb.BinaryReader): Article;
}

export namespace Article {
  export type AsObject = {
    id: string,
    title: string,
    content: string,
    image: string,
    video: string,
    owner: string,
    hiddensList: Array<number>,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    labelsMap: Array<[string, string]>,
  }
}

