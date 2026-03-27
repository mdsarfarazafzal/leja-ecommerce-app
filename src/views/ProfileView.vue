<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import { useAuthStore } from '@/stores/auth';
import InputField from '@/components/ui/InputField.vue';
import { ref } from 'vue';
import Order from '@/components/product/Order.vue';
import { useOrderStore } from '@/stores/order';

const user = useAuthStore();
const orders = useOrderStore()

const form = ref({ name: user.getUser?.name || '', avatar: user.getUser?.avatar || '' });

async function save() {
    await user.save(form.value);
}

</script>
<template>
    <div class="container">
        <div class="profile">
            <div class="profile__card">
                <div class="profile__card__img-container">
                    <img class="profile__card__img-container__img" :src="user.getUser?.avatar" alt="user pfp">
                </div>
                <div class="profile__card__details">
                    <div v-if="!user.edit">
                        {{ user.getUser?.name }}
                    </div>
                    <div v-if="!user.edit" class="profile__card__details__email">
                        {{ user.getUser?.email }}
                    </div>
                    <form @submit.prevent="save" class="profile__card__details__form">
                        <InputField v-if="user.edit" type="text" name="Full Name"
                            @send="($event) => form.name = $event" />
                        <InputField v-if="user.edit" type="text" name="Avatar URL"
                            @send="($event) => form.avatar = $event" />
                    </form>
                    <div class="profile__card__actions">
                        <Button v-if="!user.edit" icon="pi pi-sign-out" text="Logout" @clicked="user.logout" />
                        <Button v-if="!user.edit" icon="pi pi-pen-to-square" text="Edit" @clicked="user.toggleEdit" />
                        <Button v-if="user.edit" icon="pi pi-times-circle" text="Cancel" @clicked="user.toggleEdit" />
                        <Button v-if="user.edit" icon="pi pi-save" text="Save" @clicked="save" />
                    </div>
                </div>
                <!-- <div class="profile__card__actions">
                    <Button icon="pi pi-sign-out" text="Logout" @clicked="user.logout" />
                    <Button icon="pi pi-sign-out" text="&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;" @clicked="user.logout" />
                </div> -->
            </div>
            <div class="profile__orders">
                <div class="profile__orders__heading"><span class="pi pi-box
"></span> Your Orders</div>
                <div v-if="orders.getOrders.length" class="profile__orders__list">
                    <Order v-for="order in orders.getOrders" :order="order" :key="order.id" />
                </div>
                <div class="profile__orders__fallback" v-else>
                    <p><span class="pi pi-info-circle"></span> You haven't ordered anything yet.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/abstracts' as *;

.container {
    @include flex(row, center, center)
}

.profile {
    @include flex(row, flex-start, center, 50px);
    margin-top: 30px;

    max-height: calc(100vh - 200px);

    border: $border-light;
    padding: 20px;
    border-radius: $radius-lg;
    width: fit-content;

    &__card {

        // background-color: green;
        @include flex(column, flex-start, flex-start, 15px);

        &__img-container {
            border-radius: $radius-lg;
            width: 300px;
            height: 300px;

            &__img {
                border-radius: $radius-lg;
                @include img-cover;
            }
        }

        &__details {
            @include flex(column, flex-start, flex-start, 10px);
            @include body-text;
            font-size: $text-xl;
            color: $color-gray-800;

            &__email {
                @include body-text;
            }

            &__form {
                @include flex(column, flex-start, flex-start, 10px);
                width: 300px;
            }
        }

        &__actions {
            @include flex(row, flex-start, flex-start, 5px);
            width: 100%;
        }
    }

    &__orders {
        height: calc(100vh - 200px);
        overflow: scroll;
        padding-right: 25px;
        @include flex(column, center, flex-start);

        &__heading {
            @include heading-text;
            color: $color-gray-800;
            text-align: center;
            padding-bottom: 20px;
        }

        &__fallback {
            @include body-text;
            color: $color-gray-800;
            @include flex(column, center, center);
            flex: 1;
        }
    }
}
</style>