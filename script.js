let laikai;
let bausmes = [];
let bausmiuSkaicius = 0;

$().ready(function () {
  $.getJSON("laikai.json", function (blaikas) {
    laikai = blaikas;
    for (let i = 0; i < blaikas["kalejimoSarasas"].length; i++) {
      $("#chooseContainer").append(
        `<input type="checkbox" class="nusikaltimas" id=${i} value=${blaikas["kalejimoSarasas"][i].value.toString()} />`,
        `<label for=${i}>${blaikas["kalejimoSarasas"][i].name}</label><br />`
      );
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

    suma = suma + tempSuma;
    $("#bausmeCount").html(suma);
  } else {
    $("#bausmeCount").html(0);
  }
}