<template>
  <div class="flex items-center justify-center sm:py-12 sm:px-4 h-full md:h-screen">
    <div class="rounded-xl">
      <div
        class="bg-cover bg-center mx-auto w-auto [height:200px] sm:rounded-t-xl"
        style="background-image: url(/images/empty-wallet.jpg)"
        role="img"
        aria-label="Image of an empty wallet"
      ></div>
      <div class="px-10 py-10">
        <form class="max-w-md w-full space-y-8" @submit.prevent="checkForm">
          <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Vehicle Import Taxes Calculator
            </h2>
            <p class="text-sm text-center dark:text-white">
              v{{ version }} | Last updated: 03/01/2024 |
              <a
                href="https://ridwanazeez.notion.site/Vehicle-Import-Taxes-Calculator-update-notes-dbcbf1d2de55487cbaaf4daa707cc443"
                class="underline"
                target="_blank"
                >See what's new</a
              >
            </p>
            <p class="mt-4 font-medium text-gray-500 dark:text-white text-center">
              Disclaimer: This tool is in no way affiliated with the Guyana Revenue Authority (GRA).
              It is an independent calculator which uses
              <a
                href="https://web.archive.org/web/20240103192850/https://www.gra.gov.gy/imports/motor-vehicle/"
                class="underline"
                target="_blank"
                >publicly available formulas</a
              >
              <br />
            </p>
            <div v-if="errors.length">
              <p class="mt-4 font-medium text-red-500 text-center text-2xl">
                Error! Please fill in all the fields!
              </p>
              <p v-for="error in errors" :key="error" class="font-bold dark:text-white">
                {{ error }}
              </p>
            </div>
          </div>
          <div class="mt-4 space-y-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="cif" class="block text-sm font-medium text-gray-700 dark:text-white"
                  >CIF (USD)</label
                >
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="cif"
                    v-model="cif"
                    type="number"
                    name="cif"
                    placeholder="12000"
                    class="pl-7 mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="exchange-rate"
                  class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Exchange Rate (GYD to USD)</label
                >
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="exchange-rate"
                    v-model="exchange_rate"
                    step=".1"
                    type="number"
                    name="exchange-rate"
                    placeholder="208.5"
                    class="pl-7 mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="vehicle-age"
                  class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Age of Vehicle</label
                >
                <select
                  id="vehicle-age"
                  v-model="age"
                  name="vehicle-age"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled selected>Choose Vehicle Age</option>
                  <option value="under4">Under 4 Years</option>
                  <option value="over4">4 Years & Older</option>
                </select>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label for="fuel" class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Propulsion</label
                >
                <select
                  id="fuel"
                  v-model="fuel"
                  name="fuel"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled selected>Choose Propulsion Type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
            </div>
            <div v-if="fuel != 'Electric'">
              <div v-if="fuel == 'Gasoline'">
                <label for="cc" class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Engine CC</label
                >
                <select
                  id="cc"
                  v-model="cc"
                  name="cc"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled selected>Choose Engine CC</option>
                  <option value="1000">0cc - 1000cc</option>
                  <option value="1500">1001cc - 1500cc</option>
                  <option value="1800">1501cc - 1800cc</option>
                  <option value="2000">1801cc - 2000cc</option>
                  <option value="3000">2001cc - 3000cc</option>
                  <option value="4000">Over 3000cc</option>
                </select>
              </div>
              <div v-if="fuel == 'Diesel'">
                <label for="cc" class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Engine CC</label
                >
                <select
                  id="cc"
                  v-model="cc"
                  name="cc"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled selected>Choose Engine CC</option>
                  <option value="under1500">Under 1500cc</option>
                  <option value="2000">1501cc - 2000cc</option>
                  <option value="2500">2001cc - 2500cc</option>
                  <option value="3000">2501cc - 3000cc</option>
                  <option value="4000">Over 3000cc</option>
                </select>
              </div>
              <div v-if="fuel != ''" class="mt-6">
                <label for="pickup" class="block text-sm font-medium text-gray-700 dark:text-white"
                  >Is this vehicle a Pickup?</label
                >
                <select
                  id="pickup"
                  v-model="pickup"
                  name="pickup"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled selected>Choose option</option>
                  <option value="no">No</option>
                  <option value="single cab">Yes, Single Cab</option>
                  <option value="double cab">Yes, Double Cab</option>
                </select>
              </div>
            </div>
            <!-- got to research how the duty free works before i implement -->
            <!-- <div class="flex items-center">
              <input v-model="duty_free" id="duty-free" name="duty-free" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-green-500 border-gray-300 rounded" />
              <label for="duty-free" class="ml-2 block text-sm text-gray-700">Duty Free?</label>
            </div> -->
            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-green-700 dark:text-white bg-green-100 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click="
                  checkForm, calculateCost();
                  calculate();
                "
              >
                Calculate Duty
              </button>
            </div>
            <div>
              <button
                class="text-gray-300 hover:text-gray-700 rounded-md w-full"
                type="button"
                @click="toggleDark()"
              >
                Toggle Theme
              </button>
            </div>
            <p class="font-medium text-gray-300 text-center">
              Made with ♥ by
              <a href="https://ridwanazeez.github.io/" class="underline" target="_blank">me</a>
              <br />
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Results Modal -->
  <TransitionRoot as="template" :show="(show = show)">
    <Dialog as="div" class="relative z-10" :open="show" @close="show = !show">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-900 dark:text-white">
                <div class="text-center sm:text-left">
                  <div class="flex justify-between items-center pb-3">
                    <DialogTitle as="h3" class="text-xl font-bold text-gray-900 dark:text-white">
                      Results
                    </DialogTitle>
                    <label
                      class="relative inline-flex cursor-pointer items-center"
                      @click="toggleCurrency()"
                    >
                      <input
                        id="currencySwitch"
                        v-model="showPricesInUSD"
                        type="checkbox"
                        class="peer sr-only"
                      />
                      <label for="currencySwitch" class="hidden"></label>
                      <div
                        class="peer h-6 w-11 rounded-full border bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-focus:ring-green-300"
                      ></div>
                      &nbsp;Currency: {{ currency }}
                    </label>
                  </div>
                  <p v-if="pickup != 'no'" class="font-bold text-gray-900 dark:text-white pb-3">
                    Please note: The rates shown for pickup trucks are for trucks being registered
                    as "Goods vehicles"
                  </p>
                  <table class="table-auto w-full">
                    <tr>
                      <th class="text-left">Car Cost:</th>
                      <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                      <td v-if="showPricesInUSD" class="text-right">
                        {{ "$ " + Math.round(cost / exchange_rate).toLocaleString() + " " }}USD
                      </td>
                      <td v-else class="text-right">
                        {{ "$ " + Math.round(cost).toLocaleString() + " " }}GYD
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left">Duty:</th>
                      <td></td>
                      <td v-if="showPricesInUSD" class="text-right">
                        {{ "$ " + Math.round(duty_due).toLocaleString() + " " }}USD
                      </td>
                      <td v-else class="text-right">
                        {{ "$ " + Math.round(duty_due * exchange_rate).toLocaleString() + " " }}GYD
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left">Excise Tax:</th>
                      <td></td>
                      <td
                        v-if="cc == '1500' || cc == '1000' || cc == 'under1500'"
                        class="text-right"
                      >
                        <span v-if="showPricesInUSD"
                          >{{
                            "$ " + Math.round(excise_due / exchange_rate).toLocaleString() + " "
                          }}USD</span
                        >
                        <span v-else
                          >{{ "$ " + Math.round(excise_due).toLocaleString() + " " }}GYD</span
                        >
                      </td>
                      <td v-else class="text-right">
                        <span v-if="showPricesInUSD">
                          {{ "$ " + Math.round(excise_due).toLocaleString() + " " }}USD
                        </span>
                        <span v-else>
                          {{
                            "$ " + Math.round(excise_due * exchange_rate).toLocaleString() + " "
                          }}GYD
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left">VAT:</th>
                      <td></td>
                      <td v-if="showPricesInUSD" class="text-right">
                        {{ "$ " + Math.round(vat_due).toLocaleString() + " " }}USD
                      </td>
                      <td v-else class="text-right">
                        {{ "$ " + Math.round(vat_due * exchange_rate).toLocaleString() + " " }}GYD
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left">Total Taxes:</th>
                      <td></td>
                      <td v-if="showPricesInUSD" class="text-right">
                        {{ "$ " + Math.round(total_tax / exchange_rate).toLocaleString() + " " }}USD
                      </td>
                      <td v-else class="text-right">
                        {{ "$ " + Math.round(total_tax).toLocaleString() + " " }}GYD
                      </td>
                    </tr>
                    <tr>
                      <th class="text-left">Total Car Cost:</th>
                      <td></td>
                      <td v-if="showPricesInUSD" class="text-right">
                        {{
                          "$ " + Math.round(total_cost / exchange_rate).toLocaleString() + " "
                        }}USD
                      </td>
                      <td v-else class="text-right">
                        {{ "$ " + Math.round(total_cost).toLocaleString() + " " }}GYD
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-800"
              >
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-0 sm:w-auto sm:text-sm"
                  @click="
                    show = !show;
                    reset();
                  "
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useDark, useToggle } from "@vueuse/core";
import { version } from "../package.json";

const isDark = useDark();
const toggleDark = useToggle(isDark);

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  data() {
    return {
      currency: "GYD",
      showPricesInUSD: false,
      cif: "",
      exchange_rate: "208.5",
      age: "",
      cc: "",
      fuel: "",
      vehicle_type: "",
      cost: "",
      duty: "",
      vat: "",
      excise_tax: "",
      duty_free: false,
      pickup: "",
      duty_due: "",
      excise_due: "",
      vat_due: "",
      total_tax: "",
      total_cost: "",
      show: false,
      version: version,
      isDark,
      toggleDark,
      errors: [],
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (this.fuel != "Electric" && this.fuel) {
        if (this.cif && this.exchange_rate && this.age && this.cc && this.fuel) {
          this.show = !this.show;
          return true;
        }
        if (!this.cif) {
          this.errors.push("CIF required.");
        }
        if (!this.exchange_rate) {
          this.errors.push("Exchange Rate required.");
        }
        if (!this.age) {
          this.errors.push("Vehicle Age required.");
        }
        if (!this.cc) {
          this.errors.push("Vehicle CC required.");
        }
        if (!this.fuel) {
          this.errors.push("Vehicle propulsion type required.");
        }
      } else {
        if (this.cif && this.exchange_rate && this.age && this.fuel) {
          this.show = !this.show;
          return true;
        }
        if (!this.cif) {
          this.errors.push("CIF required.");
        }
        if (!this.exchange_rate) {
          this.errors.push("Exchange Rate required.");
        }
        if (!this.age) {
          this.errors.push("Vehicle Age required.");
        }
        if (!this.fuel) {
          this.errors.push("Vehicle propulsion type required.");
        }
      }
      e.preventDefault();
    },
    // Converts vehicle USD price to GYD
    calculateCost() {
      this.cost = this.cif * this.exchange_rate;
    },
    // Main tax calculation function
    calculate() {
      switch (this.fuel) {
        case "Gasoline":
          if (this.age == "under4") {
            switch (this.cc) {
              case "1000":
                this.duty = 0.35; //35% duty
                this.vat = 0.14; //14% VAT
                this.duty_due = this.duty * this.cif;
                this.vat_due = (this.cif + this.duty_due) * this.vat;
                this.vat_due = Math.round(this.vat_due);
                this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "1500":
                this.duty = 0.35; //35% duty
                this.vat = 0.14; //14% VAT
                this.duty_due = this.duty * this.cif;
                this.vat_due = (this.cif + this.duty_due) * this.vat;
                this.vat_due = Math.round(this.vat_due);
                this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "1800":
                if (this.pickup == "no") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.1; //10% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = 0;
                  this.vat_due = (this.cif + this.duty_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "2000":
                if (this.pickup == "no") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.1; //10% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = 0;
                  this.vat_due = (this.cif + this.duty_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "3000":
                if (this.pickup == "double cab") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.75; //75% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * this.duty_due + this.cif;
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 1.1; //110% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "4000":
                this.duty = 0.45; //45% duty
                this.excise_tax = 1.4; //110% excise tax
                this.vat = 0.14; //14% VAT
                this.duty_due = this.duty * this.cif;
                this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                this.vat_due = Math.round(this.vat_due);
                this.total_tax =
                  (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              default:
                console.log("Error in Gasoline under 4 years CC block");
            }
          } else {
            switch (this.cc) {
              case "1000":
                this.excise_due = 800000;
                this.duty_due = 0;
                this.total_tax = 800000;
                this.total_cost = this.cost + this.total_tax;
                break;
              case "1500":
                this.excise_due = 800000;
                this.duty_due = 0;
                this.total_tax = 800000;
                this.total_cost = this.cost + this.total_tax;
                break;
              case "1800":
                this.excise_due = (this.cif + 6000) * 0.3 + 6000;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "2000":
                this.excise_due = (this.cif + 6500) * 0.3 + 6500;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "3000":
                this.excise_due = (this.cif + 13500) * 0.7 + 13500;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "4000":
                this.excise_due = (this.cif + 14500) * 1 + 14500;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              default:
                console.log("Error in Gasoline over 4 years CC block");
            }
          }
          break;
        case "Diesel":
          if (this.age == "under4") {
            switch (this.cc) {
              case "under1500":
                this.duty = 0.35; //35% duty
                this.vat = 0.14; //14% VAT
                this.duty_due = this.duty * this.cif;
                this.vat_due = (this.cif + this.duty_due) * this.vat;
                this.vat_due = Math.round(this.vat_due);
                this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "2000":
                if (this.pickup == "no") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.1; //10% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.vat = 0.14; //14% VAT
                  this.excise_due = 0;
                  this.duty_due = this.duty * this.cif;
                  this.vat_due = (this.cif + this.duty_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "2500":
                if (this.pickup == "double cab") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.75; //75% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else if (this.pickup == "single cab") {
                  this.duty = 0.45; //45% duty
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = 0;
                  this.vat_due = (this.cif + this.duty_due) * this.vat;
                  this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 1.1; //110% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "3000":
                if (this.pickup == "double cab") {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 0.75; //75% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else if (this.pickup == "single cab") {
                  this.duty = 0.45; //45% duty
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = 0;
                  this.vat_due = (this.cif + this.duty_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax = (this.duty_due + this.vat_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                } else {
                  this.duty = 0.45; //45% duty
                  this.excise_tax = 1.1; //110% excise tax
                  this.vat = 0.14; //14% VAT
                  this.duty_due = this.duty * this.cif;
                  this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                  this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                  this.vat_due = Math.round(this.vat_due);
                  this.total_tax =
                    (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                  this.total_tax = Math.round(this.total_tax);
                  this.total_cost = this.cost + this.total_tax;
                }
                break;
              case "4000":
                this.duty = 0.45; //45% duty
                this.excise_tax = 1.1; //110% excise tax
                this.vat = 0.14; //14% VAT
                this.duty_due = this.duty * this.cif;
                this.excise_due = this.excise_tax * (this.duty_due + this.cif);
                this.vat_due = (this.cif + this.duty_due + this.excise_due) * this.vat;
                this.vat_due = Math.round(this.vat_due);
                this.total_tax =
                  (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              default:
                console.log("Error in Diesel under 4 years CC block");
            }
          } else {
            switch (this.cc) {
              case "under1500":
                this.excise_due = 800000;
                this.total_tax = 800000;
                this.total_cost = this.cost + this.total_tax;
                break;
              case "2000":
                this.excise_due = (this.cif + 15400) * 0.3 + 15400;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "2500":
                this.excise_due = (this.cif + 15400) * 0.7 + 15400;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "3000":
                this.excise_due = (this.cif + 15500) * 0.7 + 15500;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              case "4000":
                this.excise_due = (this.cif + 17200) * 1 + 17200;
                this.total_tax = this.excise_due * this.exchange_rate;
                this.total_tax = Math.round(this.total_tax);
                this.total_cost = this.cost + this.total_tax;
                break;
              default:
                console.log("Error in Diesel over 4 years CC block");
            }
          }
          break;
        case "Electric":
          this.excise_due = 0;
          this.total_tax = 0;
          this.total_cost = this.cost;
          break;
        default:
          console.log("Error in fuel block");
      }
    },
    // Resets all form values
    reset() {
      this.cif = "";
      this.age = "";
      this.cc = "";
      this.fuel = "";
      this.cost = "";
      this.duty = "";
      this.vat = "";
      this.excise_tax = "";
      this.duty_free = false;
      this.pickup = "";
      this.duty_due = "";
      this.excise_due = "";
      this.vat_due = "";
      this.total_tax = "";
      this.total_cost = "";
    },
    logFormData() {
      let formValues = [];
      formValues.push({
        CIF: this.cif,
        "Exchange Rate": this.exchange_rate,
        Age: this.age,
        CC: this.cc,
        Fuel: this.fuel,
        "Vehicle Class": this.vehicle_type,
        Cost: this.cost,
        Duty: this.duty,
        VAT: this.vat,
        "Excise Tax": this.excise_tax,
        "Duty Free?": this.duty_free,
        "Pickup?": this.pickup,
        "Duty Due": this.duty_due,
        "Excise Due": this.excise_due,
        "VAT Due": this.vat_due,
        "Total TAX": this.total_tax,
        "Total Cost": this.total_cost,
      });
      console.log("Form Data:", formValues);
    },
    toggleCurrency() {
      if (!this.showPricesInUSD) {
        this.currency = "USD";
      } else {
        this.currency = "GYD";
      }
    },
    calculateTax(cif, duty, excise_tax, vat) {
      this.duty_due = duty * cif;
      if (excise_tax == 800000) {
        this.excise_due = 800000;
      } else {
        this.excise_due = excise_tax * (this.duty_due + cif);
      }
      this.vat_due = (this.cif + this.duty_due + this.excise_due) * vat;
      this.vat_due = Math.round(this.vat_due);
      this.total_tax = (this.duty_due + this.vat_due + this.excise_due) * this.exchange_rate;
      this.total_tax = Math.round(this.total_tax);
      this.total_cost = this.cost + this.total_tax;
    },
  },
};
</script>
