import { apiError } from "../../middleware/api-error";

const MIGRATION_GUIDE_URL =
  "https://support.kinpal.com/api-reference/migrating-from-the-private-api";

function gone() {
  return Response.json(
    apiError(
      "GONE",
      `The private API has been removed. Use https://api.kinpal.com/v1 instead. Migration guide: ${MIGRATION_GUIDE_URL}`,
    ),
    { status: 410, headers: { Link: `<${MIGRATION_GUIDE_URL}>; rel="help"` } },
  );
}

export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
