    <!-- ./pages/auth/sign-in.vue -->
<script setup>

// retrive GraphQL URL from runtime config
const {
    public: { graphqlURL },
} = useRuntimeConfig();

// session & user state
const session = useSession();
const setSession = useSetSession;

// page state
const isLoading = ref(false);
const data = ref({});
const error = ref({});

// form state
const name = ref("");
const email = ref("");
const password = ref("");

// handle form submit
const handleSignIn = async (e) => {
    e.preventDefault();
    if (name && email && password) {
        // GraphQL Sign in Query
        let signInQuery = {
            query: `mutation( $email: String!, $password: String!) {
            login(input: { identifier: $email, password: $password }) {
              jwt,
              user{
                id
                username
                email
              }
            }
          }`,
            variables: { email: email.value, password: password.value },
        };
        try {
            console.log(signInQuery)
            isLoading.value = true;
            const { login, errors } = await sendReq(graphqlURL, { body: JSON.stringify(signInQuery), headers: { "Content-Type": "application/json" } });
            if (errors) throw Error(errors);
            setSession(login);

            // notify and navigate to the home page
            alert("Sign in successful!");
            navigateTo("/");
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }
};
</script>
<template>
    <v-container>
        <v-row>
            <v-col class="d-flex justify-center">
                <v-card flat width="600" class="py-5">
                    <v-card-title class="mb-5">
                        Login
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" type="email"
                                required></v-text-field>
                            <v-text-field v-model="password" :rules="emailRules" label="Password" type="password"
                                required></v-text-field>

                            <v-btn class="mr-4" @click="handleSignIn">
                                Login
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!--  <form @submit="handleSignIn" class="form auth-form">
                    <div class="wrapper">
                        <header class="form-header">
                            <h3 class="text-3xl mb-4">Sign In</h3>
                        </header>
                        <section class="input-section">
                            <div class="form-control">
                                <label for="email">Email address</label>
                                <input v-model="email" id="email" name="email" type="email" class="form-input"
                                    required />
                            </div>
                            <div class="form-control">
                                <label for="password">Password</label>
                                <input v-model="password" id="password" name="password" type="password"
                                    class="form-input" required />
                            </div>
                            <div class="action-cont">
                                <button :disabled="isLoading" class="cta">{{ isLoading ? "..." : "Sign in" }}</button>
                            </div>
                        </section>
                    </div>
                </form> -->

</template>
