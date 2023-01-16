// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { BadRequest, Forbidden } from "@feathersjs/errors";
import { Hook, HookContext } from "@feathersjs/feathers";
import { ObjectId } from "mongodb";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, id, params, path } = context;
    const user = params.user;

    const resource = await app.service(path).get(id);

    const currentUserId = new ObjectId(user?._id).toString();
    const resourceOwnerId = new ObjectId(resource?.user).toString();

    if (currentUserId !== resourceOwnerId) {
      throw new Forbidden(`You have no access to this ${path}`);
    }

    return context;
  };
};
