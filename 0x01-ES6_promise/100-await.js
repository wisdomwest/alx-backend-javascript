import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let object = {};

  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    object = { photo, user };
  } catch (error) {
    object = { photo: null, user: null };
  }
  return object;
}
