import client from '../configuration/hasura_client'
const QUERY_USER_BY_PHONE_CUSTOMER =`
query MyQuery($phone_no: String = "",$role_id:uuid!) {
  authentications(where: {phone_no: {_eq: $phone_no}, _and: {role_id: {_eq:$role_id}}}) {
    password
    phone_no
    user_id
    status
    role {
      role_name
      role_id
    }
  }
}
  `

  const QUERY_USER_BY_PHONE_VENDOR =`
  query MyQuery($phone_no: String = "",$role_id:uuid!) {
    authentications(where: {phone_no: {_eq: $phone_no}, _and: {role_id: {_eq:$role_id}}}) {
      password
      phone_no
      user_id
      status
      role {
        role_name
        role_id
      }
    }
  }
    `

    const QUERY_USER_BY_PHONE_RIDER =`
    query MyQuery($phone_no: String = "",$role_id:uuid!) {
      authentications(where: {phone_no: {_eq: $phone_no}, _and: {role_id: {_eq:$role_id}}}) {
        password
        phone_no
        user_id
        status
        role {
          role_name
          role_id
        }
      }
    }
      `    
const INSERT_USER_PASSWORD =`
mutation MyMutation($password: String = "", $user_id: uuid = "") {
  update_authentications_by_pk(pk_columns: {user_id: $user_id}, _set: {password: $password}) {
    user_id
  }
}
`
// const UPDATE_LAST_SEEN =`
// mutation MyMutation($phone_no:String!){
//   update_authentications(where: {phone_no: {_eq: $phone_no}}, _set: {last_seen: "now()"}) {
//     affected_rows
//     returning {
//       last_seen
//       password
//       phone_no
//       role_id
//       user_id
//     }
//   }
// }
// `



const User = async (variables) => {
  let data;
  if (variables.role_id === "d6895ae5-c665-420a-ae0a-6efd81ee7506") {
    data = await client.request(QUERY_USER_BY_PHONE_CUSTOMER, variables);
  } else if (variables.role_id === "9268abe4-21b8-4839-8e1e-12c4322a63cd") {
    data = await client.request(QUERY_USER_BY_PHONE_VENDOR, variables);
  } else if (variables.role_id === "56a6ed6a-f320-4a46-bb5f-10c7ece29c7c") {
    data = await client.request(QUERY_USER_BY_PHONE_RIDER, variables);
  }

  if (!data || !data['authentications'] || data['authentications'].length === 0) {
    return undefined;
  }

  return data['authentications'][0];
}

// const update_last_seen = async (variables) => {  
//   const data = await client.request(UPDATE_LAST_SEEN, variables)            
//   return data?.['update_authentications_by_pk']?.['last_seen']         
// }
const insert_password = async (variables) => {  
  const data = await client.request(INSERT_USER_PASSWORD, variables)            
  return data?.['update_authentications_by_pk']?.['user_id']         
}

export { User,insert_password}