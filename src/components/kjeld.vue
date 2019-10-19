<template>
    <div class="application-wrapper">
        <h1 style="margin:0; padding:0;">Totaal €{{ this.totalAmount }},00</h1>

        <div>
            <v-progress-linear

                    color="green"
                    height="50"
                    :value="amountThere"
            >
                <div style="width:100%; display:flex; text-align:right;justify-content:center">
                    <h3 v-if="this.goal != 0 && this.goal != null && this.goal != undefined"
                        style="text-align:right; position:absolute; left:20px;">€0</h3>
                    <h3 style="color:black; text-align:center; display:block;">{{this.amountThere.toPrecision(3)}}%</h3>
                    <h3 v-if="this.goal != 0 && this.goal != null && this.goal != undefined"
                        style="text-align:right; position:absolute; right:20px;">€{{this.goal}}</h3>
                </div>
            </v-progress-linear>


        </div>
        <div>
            <div class="wrapper-people-pic">
                <div class="wrapper-kjeld-pic">
                    <img
                            class="foto-kjeld"
                            src="../assets/kjeld.jpeg"
                            alt=""
                    />
                </div>

                <div class="people-wrapper">
                    <div class="last-donator">
                        <h2 class="name-last-donator" v-if="lastDonator !== undefined">
                            {{ lastDonator.name }}
                        </h2>
                        <h2 v-if="lastDonator !== undefined" style="margin-left:50px;">
                            &nbsp;€{{ lastDonator.amount }},00
                        </h2>
                    </div>

                    <hr>

                    <div class="last-few" v-if="(lastFiveDonators.length > 0)">
                        <div>
                            <div
                                    v-for="(donator, index) in lastFiveDonators.slice(1,6)"
                                    :key="index" style="display:flex; flex-direction:column;"
                                    class="donators-h3"
                            >
                                <div class="donator-name-amount-wrapper">
                                    <div><h3 class="donator-name-list">{{ donator.name }}:</h3>
                                    </div>
                                    <div><h3 style="margin:0; padding:0;">€{{ donator.amount }},00</h3></div>
                                </div>
                                <v-divider v-if="index != 4"></v-divider>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
        <v-divider style="margin:0 20px 20px 20px;"></v-divider>
        <div class="pictures">
            <img src="../assets/logo.png" alt="">
            <img src="../assets/novatecFinal.png" alt="">
            <img src="../assets/Groenenberg-Reclbord_v3-3.jpg" alt="">
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    axios.create({
        baseURL: "",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://colorbuilds.com/'
        }
    });

    export default {
        name: "Kjeld",
        data() {
            return {
                lastDonator: {},
                lastFiveDonators: [],
                json: {},
                totalAmount: 0,
                amountThere: 0,
                goal: 0,
                timer: '',
            }
        },
        created() {
            this.parseJson()
            this.timer = setInterval(this.parseJson, 10000)
        },
        methods: {
            getJson() {
                return axios.get(`http://colorbuilds.com/gofundme.php`);
            },
            parseJson() {
                this.getJson().then((response) => {
                    this.json = response.data.feed;
                    console.log(this.json);
                    this.totalAmount = this.json.campaign.current_amount;
                    this.lastDonator = this.json.donations[0];
                    this.lastFiveDonators = this.json.donations;
                    this.amountThere = this.json.campaign.current_amount / this.json.campaign.goal_amount * 100;
                    this.goal = this.json.campaign.goal_amount;
                }).catch(() => {
                    console.log("failed");
                });
            }
        }
    }
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
    }

</style>


<style scoped>
    h1, h2, h3, h4 {
        text-align: left;
        margin: 0;
        padding: 0;
    }

    h1 {
        font-size: 128px;
        margin-bottom: 20px;
        text-align: center;
        line-height: 160px;
    }

    h2 {
        font-size: 62px;
        margin-bottom: 5px;
        line-height: 72px;
    }

    h3 {
        font-size: 34px;
    }

    /*wrapping donators text*/
    .donators-h3 {
        white-space: nowrap;
    }

    .donators-h3 p:first-child {
        overflow: hidden;
    }


    .last-few div {
        overflow: hidden;
    }

    /*end wrapping donators*/
    .application-wrapper {
        height: 100vh;
        overflow: hidden;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
    }

    .wrapper-people-pic {
        display: flex;
        flex-direction: row;
        margin: 20px;
        box-sizing: border-box;
        height: 330px;
        overflow: hidden;
    }

    .foto-kjeld {
        border-radius: 30px;
        width: 99%;
    }

    .people-wrapper {
        flex: 1;

    }


    .last-donator {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .wrapper-kjeld-pic {
        width: 500px;
        margin-right: 40px;
    }

    .last-few {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        color: #444;
    }

    .last-few > div {
        width: 100%;
    }

    .pictures {
        display: flex;
        justify-content: space-around;
        align-content: center;
        height:100%;
        align-items: center;
    }

    .pictures img {
        max-width: 33%;
        height: 180px;

    }

    .name-last-donator {
        max-width: 900px;
        overflow: hidden;
    }

    .donator-name-list {
        min-width: 550px;
        max-width: 900px;
        margin: 0;
        padding: 0;
    }

    .donator-name-amount-wrapper {
        display: flex;
        flex-direction: row;
    }

    @media only screen and (max-width: 1300px) {
        .application-wrapper {
            height: unset;
        }

        .donator-name-list {
            min-width: unset;
            max-width: unset;

        }
        h1 {
            font-size: 62px;
        }

        h2 {
            font-size: 42px;
        }

        h3 {
            font-size: 22px;
        }

        .wrapper-kjeld-pic {
            display: none;
        }

        .wrapper-people-pic {
            height: unset;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;

        }

        .last-donator {
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .last-donator h2 {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin: 0 !important;
            width: 100%;
            box-sizing: border-box;
            margin: 0;
            padding: 5px;
            line-height: 42px !important;
        }

        .people-wrapper {
            width: 100%;
        }
        .donator-name-amount-wrapper {
            display: flex;
            flex-direction: column;
        }

        .donator-name-amount-wrapper h3 {
            text-align: center;
            white-space: pre-wrap;
            flex-wrap: wrap;
        }
        .application-wrapper > h1 {
            line-height:72px;
            white-space: pre-wrap;
        }
        .pictures img {
            height:unset;
            padding:5px;
            object-fit: contain;
        }
        .name-last-donator {
            max-width:unset;
        }

    }


</style>
