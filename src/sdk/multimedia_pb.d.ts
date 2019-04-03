import * as jspb from "google-protobuf"

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class Media extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Media.AsObject;
  static toObject(includeInstance: boolean, msg: Media): Media.AsObject;
  static serializeBinaryToWriter(message: Media, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Media;
  static deserializeBinaryFromReader(message: Media, reader: jspb.BinaryReader): Media;
}

export namespace Media {
  export type AsObject = {
    name: string,
    content: Uint8Array | string,
  }
}

