## ITEM B:

pseudocode and explanation of user flow in login process:

in the html page there will be a form with either the username field or the email field
and the password field as its most basic fields to enter personal credentials.

the form will also contain a simple button that has an event listener binded to
it that will call a function called login to send the credentials entered by user to the
api endpoint that will process these credentials

<form>
    <email or username field/>
    <password field/>
    <login button onclick=login()/>
</form>


this login function implements a token-based authentication for users
particularly with the use of json web tokens

login(){

    response = send request to an API endpoint http://<local host>/registration/token
    data = convert response to json object

    if response is ok (200)
        set browser storage to current token
    
    else if response returns a 400 or 401 due to bad request or wrong credentials
    (cases of these wrong credentials can be an empty string, non existent 
    credentials in the database, etc.)
        alert user that credentials are invalid, empty, or non existent

}

react code I made from my other projects:

```export default function Login() {
  const patriarch = useContext(AuthContext);
  const setAuthTokens = patriarch.setAuthTokens;
  const csrf_token = patriarch.getCookie("csrftoken");
  let navigate = useNavigate();

  // fields
  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");

  // handler
  const loginUser = async (args, setAuthTokens) => {
    const { csrf_token, username, pass } = args;

    try {
      const response = await fetch("http://127.0.0.1:8000/registration/token", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrf_token,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: pass
        })
      });

      // extract data and organize into structured text
      const data = await response.json();
      const objects = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      if (response.status === 200) {
        // a status 200 response is an ok
        setAuthTokens(JSON.stringify(data));
        alert(
          `login successful redirecting to home page\ncredentials:\n${objects}`
        );
        navigate("/", { replace: true });
      } else {
        // error sent as response by the server
        alert(
          `ERROR OCCURED: STATUS ${response.status} ${response.statusText} DETECTED\nERRORS ARE THE FF:\n${objects}`
        );
      }
    } catch (error) {
      alert(`ERROR: ${error} DETECTED`);
    }
  };

  return (
    <div className="App">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={pass}
                  onChange={(event) => setPass(event.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    loginUser({ csrf_token, username, pass }, setAuthTokens);
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}```



when request is sent credentials will be caught by a function that 
will process these tokens and do a look up in the database

below is the python code I made that utilized django, django-rest-framework, and simple-jwt
to return the token for the user that input their credentials, in order to use for future
interactions in the website, that is only exclusive for access for a logged in user

```path('token', serializers.AdvocateTokenObtainPairView.as_view(), name='advocateTokenObtainPairView'),```

```class AdvocateTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email

        return token

class AdvocateTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdvocateTokenObtainPairSerializer```