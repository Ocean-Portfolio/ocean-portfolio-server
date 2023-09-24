const selfCheckWithDBConnection = async () => {
  try {
    const dbConnection = await fetch('http://localhost:5300/api/getHello');
    const resData = await dbConnection.json();

    if (resData.exists === true) return true;
  } catch (error) {
    return error;
  }
  return false;
};

export default selfCheckWithDBConnection;
