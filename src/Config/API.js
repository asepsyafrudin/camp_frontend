export const serverPort = "http://localhost:8080";
// export const socketPort = "http://localhost:8000";

//login
export const loginUserApi = `${serverPort}/api/login`;
export const registerUserapi = `${serverPort}/api/users/create`;
export const getUsersApi = `${serverPort}/api/users/getUsers`;
export const approveUserApi = (id) => {
  return `${serverPort}/api/users/approve/${id}`;
};
export const deleteUserApi = (id) => {
  return `${serverPort}/api/users/delete_user/${id}`;
};
export const updateUserApi = `${serverPort}/api/users/update_user`;

//DATA LOG

export const getDataLogApi = `${serverPort}/api/data_log/getDataLog`;

// MASTER PLANT
export const createMasterPlantApi = `${serverPort}/api/master_plant/create`;
export const getMasterPlantApi = `${serverPort}/api/master_plant/getMasterPlant`;
export const updateMasterPlantApi = `${serverPort}/api/master_plant/update`;
export const deleteMasterPlantApi = (id) => {
  return `${serverPort}/api/master_plant/delete/${id}`;
};
export const setStatusActiveMasterPlant = (id) => {
  return `${serverPort}/api/master_plant/active/${id}`;
};

//master setting
export const getMasterSettingApi = `${serverPort}/api/master_setting/getMasterSetting`;
export const updateMasterSettingApi = `${serverPort}/api/master_setting/update`;
    