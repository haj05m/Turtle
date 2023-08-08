var currentDateTime = new Date();
var year = currentDateTime.getFullYear();
var month = (currentDateTime.getMonth() + 1);
var date = (currentDateTime.getDate() + 1);

if(date < 10) {
  date = '0' + date;
}
if(month < 10) {
  month = '0' + month;
}

var dateTomorrow = year + "-" + month + "-" + date;
var checkinElem = document.querySelector("#checkin-date");
var checkoutElem = document.querySelector("#checkout-date");

checkinElem.setAttribute("min", dateTomorrow);

checkinElem.onchange = function () {
    checkoutElem.setAttribute("min", this.value);
}
//ticket.js file

console.info("Ticket store loaded!");

document.addEventListener('alpine:init', () => {
  Alpine.data('tickets', () => ({
      date: null,
      totalPrice:0,
      TimeDuration:0,
      Guests: [
            {
              name: 'Foreign Adult',
              normal: 10,
              peak: 13,
              count: 0,
              total: 0
          },
          {
            name: 'Foreign Child',
            normal: 5,
            peak: 8,
            count: 0,
            total: 0
        },
        {
            name: 'Sri Lankan Adult',
            normal: 4,
            peak: 6,
            count: 0,
            total: 0
        },
        {
            name: 'Sri Lankan Child',
            normal: 2,
            peak: 3,
            count: 0,
            total: 0
        },
        {
            name: 'Infant',
            normal: 0,
            peak: 0,
            count: 0,
            total: 0
        },
      ],
      Times: [
          {
              title: '7am to 8am',
              isPeak: false
          },
          {
              title: '8am to 9am',
              isPeak: false
          },
          {
              title: '9am to 10am',
              isPeak: false
          },
          {
              title: '10am to 11am (Peak)',
              isPeak: true
          },
          {
              title: '11am to 12am (Peak)',
              isPeak: true
          },
          {
            title: '12pm to 1pm (Peak)',
            isPeak: true
        },
        {
            title: '1pm to 2pm',
            isPeak: false
        },
        {
            title: '2pm to 3pm',
            isPeak: false
        },
        {
            title: '3pm to 4pm (Peak)',
            isPeak: true
        },
        {
            title: '4pm to 5pm (Peak)',
            isPeak: true
        },
        {
            title: '5pm to 6pm (Peak)',
            isPeak: true
        },
    ],
    selectedTimeSlots: [],

    showTimes: false,

    //------- Functions -------

    selectTimeSlot(index) {

        // check if the index is already in the array
        if (this.selectedTimeSlots.includes(index)) {

            // remove the index from the array
            this.selectedTimeSlots = this.selectedTimeSlots.filter(item => item !== index);

        } else {
// Todo - you should be able to select time slots in the past !!!

              // get the last element of the array
              let lastElement = this.selectedTimeSlots[this.selectedTimeSlots.length - 1];

              // add 1 to the last element and check if the value is equals to the index
              if (!this.selectedTimeSlots.length || index - 1 == lastElement) {

                  // add the index to the array
                  this.selectedTimeSlots.push(index);

              } else {
                  alert('You can only select consecutive time slots');
              }
          }

          // sort the array
          this.selectedTimeSlots = this.selectedTimeSlots.sort();
          this.TimeDuration = this.selectedTimeSlots.length;

          console.log(this.selectedTimeSlots);
      },
      calculate(Guest) {

        let total = 0;

        this.selectedTimeSlots.forEach((timeSlotIndex) => {

            // calculate the total
            total += parseInt(Guest.count * (this.Times[timeSlotIndex].isPeak ? Guest.peak : Guest.normal));
        });

        Guest.total = total;
        this.CalculateTotal();
    },

    CalculateTotal(Guest) {

      let totalPrice = 0;

      this.Guests.forEach((Guest) => { //here instead of total (key) we use the singular term of array name
            
        // calculate the total
        totalPrice += Guest.total;// can't directly access JSON objects inside the array
    });

    this.totalPrice = totalPrice;

    console.log("Total price equal ", totalPrice);
},

  Continue(){
      // store the data in the local storage
      localStorage.setItem('Guests', JSON.stringify(this.Guests));
      localStorage.setItem('selectedTimeSlots',JSON.stringify(this.selectedTimeSlots));
      localStorage.setItem('Times', JSON.stringify(this.Times));//changes i made
      localStorage.setItem('date',this.date);
      localStorage.setItem('totalPrice', this.totalPrice);
      localStorage.setItem('timeDuration',JSON.stringify(this.selectedTimeSlots.length));
      localStorage.setItem('TimeDuration',this.TimeDuration);

      // redirect to the checkout page
      window.location.href = 'details.html';
  },
}));
})




/*
document.addEventListener("alpine:init", () => {
  Alpine.data("guest", () => ({
    guests: {
      'Local Adult': 0,
      'Local Child': 0,
      'Foreign Adult': 0,
      'Foreign Child': 0,
      'Infant': 0,
    },

    addGuest(guestType) {
      this.guests[guestType]++;
      this.saveToLocalStorage();
    },
 deleteGuest(guestType) {
      if (this.guests[guestType] > 0) {
        this.guests[guestType]--;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("guests", JSON.stringify(this.guests));
    },

    initFromLocalStorage() {
        const storedGuests = localStorage.getItem('guests');
        if (storedGuests) {
          this.guests = JSON.parse(storedGuests);
        }
      }
  }));
}); */
// -----Country Code Selection
$("#mobile_code").intlTelInput({
	initialCountry: "in",
	separateDialCode: true,
	// utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});

