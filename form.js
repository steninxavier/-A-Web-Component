const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="form.css" />
<div class="address-body">
<h3>Adresse</h3>
PLZ
<input type="tel" class="plz" value="" />
Stadt
<input class="stadt" />
<br />
Strasse
<select class="strasse" name="strasseName">
</select>
Hausnummer
<input class="hausnummer" />
<br />
Land
<input class="land" value="Deutschland" readonly />
<br />
<button class="buttonevent">INFO</button>
<div class="buttonClick"></div>
<div class="datavisual"></div>
</div>
`;
class addressComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }
  plzChange() {
    var d = this.shadowRoot.querySelector(".plz").value.length;
    if (d === 5) {
      var x = this.shadowRoot.querySelector(".plz").value;
      var result = fetch("./data.json")
        .then((response) => response.json())
        .then((mydata) => {
          for (var i = 0; i < mydata.length; i++) {
            if (mydata[i].PLZ == x) {
              console.log(x);
              this.shadowRoot.querySelector(".stadt").value = mydata[i].Stadt;
              var select = this.shadowRoot.querySelector(".strasse");
              for (var j = 0; j < mydata[i].strasse[j].length; j++) {
                var option = document.createElement("OPTION"),
                  txt = document.createTextNode(mydata[i].strasse[j]);
                option.appendChild(txt);
                option.setAttribute("value", mydata[i].strasse[j]);
                select.insertBefore(option, select.lastChild);
              }
            }
          }
        });
    } else {
      console.log("it is an error");
      var z = "Give a valid PLZ";
      this.shadowRoot.querySelector(".buttonClick").innerHTML = z;
    }
  }
  CallData() {
    var x = this.shadowRoot.querySelector(".plz").value;
    var y = this.shadowRoot.querySelector(".land").value;
    var r = this.shadowRoot.querySelector(".stadt").value;
    var s = this.shadowRoot.querySelector(".strasse").value;
    var h = this.shadowRoot.querySelector(".hausnummer").value;
    this.shadowRoot.querySelector(".datavisual").innerHTML =
      "{" +
      "PLZ" +
      ":" +
      JSON.stringify(x) +
      "," +
      "Land" +
      ":" +
      JSON.stringify(y) +
      "," +
      "Stadt" +
      ":" +
      JSON.stringify(r) +
      "," +
      "Strasse" +
      ":" +
      JSON.stringify(s) +
      "," +
      "Hausnummer" +
      ":" +
      JSON.stringify(h) +
      "}";
  }
  connectedCallback() {
    this.shadowRoot
      .querySelector(".buttonevent")
      .addEventListener("click", () => {
        this.CallData();
      });
    this.shadowRoot.querySelector(".plz").addEventListener("change", () => {
      this.plzChange();
    });
  }
}
window.customElements.define("address-component", addressComponent);
