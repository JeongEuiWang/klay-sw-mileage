import axios, {AxiosInstance} from "axios";

const baseURL = `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_API_VERSION}`

const StudentServer = axios.create({baseURL: `${baseURL}students`})
const AuthServer = axios.create({baseURL: `${baseURL}auth`})
const AcademicFieldServer = axios.create({baseURL: `${baseURL}academic-field`})

const setAuthorizationToInstanceHeader = (server: AxiosInstance, token: string) => {
  server.defaults.headers.common.Authorization = token;
}

const updateAuthorization = (token: string) => {
  setAuthorizationToInstanceHeader(StudentServer, token)
}


export {
  updateAuthorization,
  AuthServer,
  StudentServer,
  AcademicFieldServer
}
