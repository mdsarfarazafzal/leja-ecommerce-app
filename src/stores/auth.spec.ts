import { useAuthStore } from "./auth"

jest.mock('sarfaraz-api-wrapper', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    post: jest.fn(),
    request: jest.fn(),
  }));
});

jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));


describe('Auth Store', ()=>{
    it('should set user data on login',async ()=>{
        const user = useAuthStore();
        const loggedIn = await user.login({email: 'rahul@gmail.com', password: 'abcd1234'});
        expect(loggedIn).toBeTruthy();
        expect(user.getUser).not.toBeNull();
        // console.log(user.getUser);
        expect(user.isAuthenticated).toBeTruthy();
    })
})