(function (angularApp) {
  angularApp.constant('REGEX', {
    emailFormat: /^[a-zA-Z]+[a-zA-Z0-9._+]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/,
    passwordFormat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+,.<\][{\-}/;:='"?|\\>])[A-Za-z\d`~!@#$%^&*()_+,.<\][{\-}/;:='"?|\\>]{8,20}/,
    crnLength: /^.{8,21}$/,
    empLength: /^.{1,6}$/,
    addressLength: /^.{2,80}$/,
    postalCodeLength: /^.{5,8}$/,
    officePhoneLength: /^.{8,12}$/,
    otherReason: /^.{2,20}$/,
    amount: /^.{5,9}$/,
    shName: /^.{2,80}$/,
    shMobile: /^.{8,12}$/,
    shPassport: /^.{8,26}$/,
    shDrivingLicence: /^.{8,16}$/,
    stringField: /^.{2,80}$/,
    ibanNumber: /^(?=[A-Za-z0-9]*[A-Za-z]+)(?=[A-Za-z0-9]*[0-9]+)[A-Za-z0-9]{8,34}$/,
    swiftCode: /^.{8,11}$/
  });
}(app));
