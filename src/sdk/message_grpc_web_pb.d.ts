import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {Message} from './message_pb';

export class MessagesClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  send(
    request: Message,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  receive(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Message>;

}

export class MessagesPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  send(
    request: Message,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  receive(
    request: user_pb.User,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<Message>;

}
