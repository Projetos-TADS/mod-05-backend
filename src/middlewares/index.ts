import handleError from "./handleError.middleware";
import validateBody from "./validateBody.middleware";
import verifyUserIdExists from "./verifyUserIdExists";
import verifyEmailExists from "./verifyEmailExists";
import isAdmin from "./isAdmin.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyMovieIdExists from "./verifyMovieIdExists";
import verifyFavoriteIdExists from "./verifyFavoriteIdExists";
import verifyActorIdExists from "./verifyActorIdExists";
import isAdminOrOwner from "./isAdminOrOwner.middleware";

export default {
  handleError,
  validateBody,
  verifyUserIdExists,
  verifyEmailExists,
  isAdmin,
  verifyToken,
  verifyMovieIdExists,
  verifyFavoriteIdExists,
  verifyActorIdExists,
  isAdminOrOwner,
};
