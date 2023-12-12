const selfCheckWithDBConnection = async () => {
  try {
    const dbConnection = await fetch('http://localhost:5300/api/getHello');
    const resData = await dbConnection.json();

    if (resData.exists === true) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

export default selfCheckWithDBConnection;
