import handleError from "./handleError.middleware";
import validateBody from "./validate.middleware";
import verifyIdExists from "./verifyIdExists";
import verifyEmailExists from "./verifyEmailExists";
import isAdmin from "./isAdmin.middleware";

export default { handleError, validateBody, verifyIdExists, verifyEmailExists, isAdmin };
