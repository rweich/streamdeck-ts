import { Static } from "@sinclair/typebox";
import Ajv from "ajv";
import EventValidationError from "./exception/EventValidationError";

export default function assertType<T extends object>(type: T, payload: unknown): asserts payload is Static<typeof type> {
  const ajv = new Ajv();
  if (!ajv.validate(type, payload)) {
    throw new EventValidationError(
      "error while validating payload: "
      + ajv.errors?.map(e => e.message).join(", ")
      + " payload: "
      + JSON.stringify(payload)
    );
  }
}
