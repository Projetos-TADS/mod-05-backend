import handleError from "./handleError.middleware";
import validateBody from "./validate.middleware";
import verifyIdExists from "./verifyIdExists";
import verifyEmailExists from "./verifyEmailExists";

export default { handleError, validateBody, verifyIdExists, verifyEmailExists };
