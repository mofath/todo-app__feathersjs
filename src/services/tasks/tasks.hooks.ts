import { HookContext } from "@feathersjs/feathers";
import * as authentication from "@feathersjs/authentication";
import { NotAuthenticated } from "@feathersjs/errors";
import isOwner from "../../hooks/isOwner";
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const attachUserId = () => (context: HookContext) => {
  context.data.user = context.params.user?._id;
  return context;
};

export default {
  before: {
    all: [authenticate("jwt")],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [authenticate("jwt"), attachUserId()],
    update: [authenticate("jwt"), isOwner()],
    patch: [authenticate("jwt"), isOwner()],
    remove: [authenticate("jwt"), isOwner()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
