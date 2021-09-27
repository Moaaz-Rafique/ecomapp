import {Home, LoginScreen, MenuScreen, ProductScreen, SignupScreen} from '../Screen';
export const permaScreens = [
  {name: 'Home', component: Home},
  {name: 'Product', component: ProductScreen},
  {name: "Menu", component: MenuScreen},
  
];

export const LoggedOutScreens = [
      {name: 'Login', component: LoginScreen},
      {name: 'Signup', component: SignupScreen},
]


// export const Screen = [
//       {name: 'Login', component: LoginScreen},
//       {name: 'Signup', component: SignupScreen},
// ]


  /* <Stack.Screen name="Menu" component={MenuScreen} />
<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="Signup" component={SignupScreen} />
<Stack.Screen name="Product" component={ProductScreen} /> */

