let laikai;
let bausmes = [];
let bausmiuSkaicius = 0;
let reikalingaData;
let teistumuSkaicius = 0;
let teistumaiMultiplier = 1;
let lengvinanti = false;

$().ready(function () {
  $.getJSON("/laikai.json", function (data) {
    laikai = data;
    for (let i = 0; i < data["kalejimoSarasas"].length; i++) {
      $("#chooseContainer").append(
        `<input type="checkbox" class="nusikaltimas" id=${i} value=${data[
          "kalejimoSarasas"
        ][i].value.toString()} />`,
        `<label for=${i}>${data["kalejimoSarasas"][i].name}</label><br />`
      );
      reikalingaData = new Date(Date.now() - 1209600000);
      $("#reikalingaData").html(reikalingaData.toLocaleDateString());
    }
    $(".nusikaltimas").change(function () {
      if (this.checked) {
        bausmes.push({ id: this.id, value: this.value });
      } else {
        for (let i = 0; i < bausmes.length; i++) {
          if (bausmes[i].id == this.id) {
            bausmes.splice(i, 1);
            break;
          }
        }
      }
      recalculateBausme();
    });
    $("#lengvinantiButton").change(function () {
      if (this.checked) {
        lengvinanti = true;
      } else {
        lengvinanti = false;
      }
      recalculateBausme();
    });
    $(".teistumai").change(function () {
      teistumaiMultiplier = laikai.teistumai[this.value - 1].value;
      recalculateBausme();
    });
  });
});

function recalculateBausme() {
  if (bausmes.length > 0) {
    let suma = 0;
    for (let i = 0; i < bausmes.length; i++) {
      suma = Math.max(suma, bausmes[i].value);
    }

    let tempSuma = -suma;
    for (let bausme of bausmes) {
      tempSuma += parseInt(bausme.value);
    }

    suma =
      suma * teistumaiMultiplier +
      Math.ceil((tempSuma * teistumaiMultiplier) / 3);

    suma = lengvinanti ? Math.ceil(suma / 2) : suma;
    $("#bausmeCount").html(suma);
  } else {
    $("#bausmeCount").html(0);
  }
}