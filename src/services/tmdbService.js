import httpCommon from "../common/http-common";

export const getAll = () => httpCommon.get("/popular?language=en-US&page1");