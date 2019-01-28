// datepicker
jQuery(document).ready(function($){

  // add date picker skin class
  jQuery( "body" ).attr('class', 'll-skin-santiago');
  // disable forms
  jQuery( "div.calc-forms form" ).submit(function(event) {
    return false;
  });

  // NC lifeExpectancy
  $('#age').change(function(){
    var value = parseFloat($("#age").val());
    $("#lifeExpectancy").html(value);
    return false;
  });

  // SC lifeExpectancy
  var sc_gender = $('#gender');
  sc_gender.change(function(){
      var gender_is = sc_gender.val();
      var age = null;
      if(gender_is == 'male'){
        age = $('#m-age');
        $('#m_options').show('fast');
        $('#f_options').hide('fast');
      }
      if(gender_is == 'female'){
        age = $('#f-age');
        $('#f_options').show('fast');
        $('#m_options').hide('fast');

      }
      age.change(function(){
        // console.log(age.val());
        // var value = parseFloat(age.val());
        var value = age.val();
        $("#lifeExpectancy").html(value);
        return false;
      });
  });

  //  Weeks
  var weeks;
  var dates = $("#from, #to").datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1,
    onSelect: function(selectedDate){
        var option = this.id == "from" ? "minDate": "maxDate",
        instance = $(this).data("datepicker");
        date = $.datepicker.parseDate(
        instance.settings.dateFormat ||
        $.datepicker._defaults.dateFormat,
        selectedDate, instance.settings);
        dates.not(this).datepicker("option", option, date);
    }
  });

  $('#weeks_calculator').submit(function(){
    var start = $.datepicker.parseDate('mm/dd/yy', dates[0].value);
    var end = $.datepicker.parseDate('mm/dd/yy', dates[1].value);
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var difference = Math.abs(start.getTime() - end.getTime()) + ONE_DAY;
    var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    var numWeeks = difference / ONE_WEEK;
    numWeeks = Math.round(numWeeks*100)/100;
    numWeeks = insertCommas(numWeeks);
    numWeeks = insertTrailingZeros(numWeeks);
    $("#weeks").html(numWeeks);
    return false;
  });

  // Compensation Rate Calculator
  $('#nc_compensation_rate_calculator').validate({
     rules: {
       NCaww: {
         required: true,
         number: true,
         min: 0
       },
       NCyear: {
         required: true,
         number: true,
         min: 2004,
         max: 2015
       }
     }
  });

  // Compensation Rate Calculator
  $('#nc_compensation_rate_calculator').submit(function(){
     if($('#nc_compensation_rate_calculator').valid()){
      var NCaww = parseFloat($("#NCaww").val());
      var NCyear = parseFloat($("#NCyear").val());
      var value = NCcalculateValue(NCaww, NCyear);
      value = Math.round(value*100)/100;
      value = insertCommas(value);
      value = insertTrailingZeros(value);
      $("#NCcrc").html(value);
     }
    return false;
  });
});


// NC Commuted Value Calculator
jQuery(document).ready(function($){
  var NCweeksVal = new Array();
  NCweeksVal[1] =  .9996  ;
  NCweeksVal[2] = 1.9988  ;
  NCweeksVal[3] = 2.9977  ;
  NCweeksVal[4] = 3.9961  ;
  NCweeksVal[5] = 4.9942  ;
  NCweeksVal[6] = 5.9919  ;
  NCweeksVal[7] = 6.9892  ;
  NCweeksVal[8] = 7.9862  ;
  NCweeksVal[9] = 8.9827  ;
  NCweeksVal[10] =  9.9789  ;
  NCweeksVal[11] =  10.9746 ;
  NCweeksVal[12] =  11.9700 ;
  NCweeksVal[13] =  12.9651 ;
  NCweeksVal[14] =  13.9597 ;
  NCweeksVal[15] =  14.9539 ;
  NCweeksVal[16] =  15.9478 ;
  NCweeksVal[17] =  16.9413 ;
  NCweeksVal[18] =  17.9344 ;
  NCweeksVal[19] =  18.9271 ;
  NCweeksVal[20] =  19.9194 ;
  NCweeksVal[21] =  20.9114 ;
  NCweeksVal[22] =  21.9030 ;
  NCweeksVal[23] =  22.8942 ;
  NCweeksVal[24] =  23.8850 ;
  NCweeksVal[25] =  24.8754 ;
  NCweeksVal[26] =  25.8655 ;
  NCweeksVal[27] =  26.8551 ;
  NCweeksVal[28] =  27.8444 ;
  NCweeksVal[29] =  28.8333 ;
  NCweeksVal[30] =  29.8219 ;
  NCweeksVal[31] =  30.8100 ;
  NCweeksVal[32] =  31.7978 ;
  NCweeksVal[33] =  32.7852 ;
  NCweeksVal[34] =  33.7722 ;
  NCweeksVal[35] =  34.7588 ;
  NCweeksVal[36] =  35.7451 ;
  NCweeksVal[37] =  36.7310 ;
  NCweeksVal[38] =  37.7164 ;
  NCweeksVal[39] =  38.7016 ;
  NCweeksVal[40] =  39.6863 ;
  NCweeksVal[41] =  40.6707 ;
  NCweeksVal[42] =  41.6546 ;
  NCweeksVal[43] =  42.6382 ;
  NCweeksVal[44] =  43.6215 ;
  NCweeksVal[45] =  44.6043 ;
  NCweeksVal[46] =  45.5868 ;
  NCweeksVal[47] =  46.5689 ;
  NCweeksVal[48] =  47.5506 ;
  NCweeksVal[49] =  48.5319 ;
  NCweeksVal[50] =  49.5129 ;
  NCweeksVal[51] =  50.4934 ;
  NCweeksVal[52] =  51.4736 ;
  NCweeksVal[53] =  52.4535 ;
  NCweeksVal[54] =  53.4329 ;
  NCweeksVal[55] =  54.4120 ;
  NCweeksVal[56] =  55.3907 ;
  NCweeksVal[57] =  56.3690 ;
  NCweeksVal[58] =  57.3469 ;
  NCweeksVal[59] =  58.3245 ;
  NCweeksVal[60] =  59.3017 ;
  NCweeksVal[61] =  60.2785 ;
  NCweeksVal[62] =  61.2550 ;
  NCweeksVal[63] =  62.2310 ;
  NCweeksVal[64] =  63.2067 ;
  NCweeksVal[65] =  64.1820 ;
  NCweeksVal[66] =  65.1570 ;
  NCweeksVal[67] =  66.1315 ;
  NCweeksVal[68] =  67.1057 ;
  NCweeksVal[69] =  68.0795 ;
  NCweeksVal[70] =  69.0530 ;
  NCweeksVal[71] =  70.0260 ;
  NCweeksVal[72] =  70.9987 ;
  NCweeksVal[73] =  71.9711 ;
  NCweeksVal[74] =  72.9430 ;
  NCweeksVal[75] =  73.9146 ;
  NCweeksVal[76] =  74.8858 ;
  NCweeksVal[77] =  75.8566 ;
  NCweeksVal[78] =  76.8270 ;
  NCweeksVal[79] =  77.7971 ;
  NCweeksVal[80] =  78.7668 ;
  NCweeksVal[81] =  79.7362 ;
  NCweeksVal[82] =  80.7051 ;
  NCweeksVal[83] =  81.6737 ;
  NCweeksVal[84] =  82.6419 ;
  NCweeksVal[85] =  83.6098 ;
  NCweeksVal[86] =  84.5772 ;
  NCweeksVal[87] =  85.5443 ;
  NCweeksVal[88] =  86.5111 ;
  NCweeksVal[89] =  87.4774 ;
  NCweeksVal[90] =  88.4434 ;
  NCweeksVal[91] =  89.4090 ;
  NCweeksVal[92] =  90.3743 ;
  NCweeksVal[93] =  91.3391 ;
  NCweeksVal[94] =  92.3036 ;
  NCweeksVal[95] =  93.2677 ;
  NCweeksVal[96] =  94.2315 ;
  NCweeksVal[97] =  95.1949 ;
  NCweeksVal[98] =  96.1579 ;
  NCweeksVal[99] =  97.1206 ;
  NCweeksVal[100] = 98.0828 ;
  NCweeksVal[101] = 96.3595 ;
  NCweeksVal[102] = 97.2704 ;
  NCweeksVal[103] = 98.1805 ;
  NCweeksVal[104] = 99.0898 ;
  NCweeksVal[105] = 99.9983 ;
  NCweeksVal[106] = 100.9061  ;
  NCweeksVal[107] = 101.8130  ;
  NCweeksVal[108] = 102.7192  ;
  NCweeksVal[109] = 103.6245  ;
  NCweeksVal[110] = 104.5291  ;
  NCweeksVal[111] = 105.4329  ;
  NCweeksVal[112] = 106.3359  ;
  NCweeksVal[113] = 107.2382  ;
  NCweeksVal[114] = 108.1396  ;
  NCweeksVal[115] = 109.0403  ;
  NCweeksVal[116] = 109.9402  ;
  NCweeksVal[117] = 110.8393  ;
  NCweeksVal[118] = 111.7377  ;
  NCweeksVal[119] = 112.6353  ;
  NCweeksVal[120] = 113.5321  ;
  NCweeksVal[121] = 114.4281  ;
  NCweeksVal[122] = 115.3234  ;
  NCweeksVal[123] = 116.2179  ;
  NCweeksVal[124] = 117.1116  ;
  NCweeksVal[125] = 118.0046  ;
  NCweeksVal[126] = 118.8968  ;
  NCweeksVal[127] = 119.7882  ;
  NCweeksVal[128] = 120.6789  ;
  NCweeksVal[129] = 121.5688  ;
  NCweeksVal[130] = 122.4580  ;
  NCweeksVal[131] = 123.3464  ;
  NCweeksVal[132] = 124.2340  ;
  NCweeksVal[133] = 125.1209  ;
  NCweeksVal[134] = 126.0070  ;
  NCweeksVal[135] = 126.8924  ;
  NCweeksVal[136] = 127.7771  ;
  NCweeksVal[137] = 128.6609  ;
  NCweeksVal[138] = 129.5441  ;
  NCweeksVal[139] = 130.4265  ;
  NCweeksVal[140] = 131.3081  ;
  NCweeksVal[141] = 132.1890  ;
  NCweeksVal[142] = 133.0692  ;
  NCweeksVal[143] = 133.9486  ;
  NCweeksVal[144] = 134.8272  ;
  NCweeksVal[145] = 135.7052  ;
  NCweeksVal[146] = 136.5824  ;
  NCweeksVal[147] = 137.4588  ;
  NCweeksVal[148] = 138.3345  ;
  NCweeksVal[149] = 139.2095  ;
  NCweeksVal[150] = 140.0838  ;
  NCweeksVal[151] = 140.9573  ;
  NCweeksVal[152] = 141.8301  ;
  NCweeksVal[153] = 142.7021  ;
  NCweeksVal[154] = 143.5735  ;
  NCweeksVal[155] = 144.4441  ;
  NCweeksVal[156] = 145.3140  ;
  NCweeksVal[157] = 146.1831  ;
  NCweeksVal[158] = 147.0515  ;
  NCweeksVal[159] = 147.9192  ;
  NCweeksVal[160] = 148.7862  ;
  NCweeksVal[161] = 149.6525  ;
  NCweeksVal[162] = 150.5180  ;
  NCweeksVal[163] = 151.3829  ;
  NCweeksVal[164] = 152.2470  ;
  NCweeksVal[165] = 153.1104  ;
  NCweeksVal[166] = 153.9734  ;
  NCweeksVal[167] = 154.8350  ;
  NCweeksVal[168] = 155.6963  ;
  NCweeksVal[169] = 156.5568  ;
  NCweeksVal[170] = 157.4166  ;
  NCweeksVal[171] = 158.2758  ;
  NCweeksVal[172] = 159.1342  ;
  NCweeksVal[173] = 159.9919  ;
  NCweeksVal[174] = 160.8489  ;
  NCweeksVal[175] = 161.7052  ;
  NCweeksVal[176] = 162.5608  ;
  NCweeksVal[177] = 163.4157  ;
  NCweeksVal[178] = 164.2699  ;
  NCweeksVal[179] = 165.1234  ;
  NCweeksVal[180] = 165.9762  ;
  NCweeksVal[181] = 166.8283  ;
  NCweeksVal[182] = 167.6797  ;
  NCweeksVal[183] = 168.5305  ;
  NCweeksVal[184] = 169.3805  ;
  NCweeksVal[185] = 170.2298  ;
  NCweeksVal[186] = 171.0785  ;
  NCweeksVal[187] = 171.9264  ;
  NCweeksVal[188] = 172.7737  ;
  NCweeksVal[189] = 173.6202  ;
  NCweeksVal[190] = 174.4661  ;
  NCweeksVal[191] = 175.3113  ;
  NCweeksVal[192] = 176.1558  ;
  NCweeksVal[193] = 176.9997  ;
  NCweeksVal[194] = 177.8428  ;
  NCweeksVal[195] = 178.6853  ;
  NCweeksVal[196] = 179.5271  ;
  NCweeksVal[197] = 180.3682  ;
  NCweeksVal[198] = 181.2086  ;
  NCweeksVal[199] = 182.0484  ;
  NCweeksVal[200] = 182.8875  ;
  NCweeksVal[201] = 183.7259  ;
  NCweeksVal[202] = 184.5636  ;
  NCweeksVal[203] = 185.4007  ;
  NCweeksVal[204] = 186.2371  ;
  NCweeksVal[205] = 187.0728  ;
  NCweeksVal[206] = 187.9078  ;
  NCweeksVal[207] = 188.7422  ;
  NCweeksVal[208] = 189.5759  ;
  NCweeksVal[209] = 190.4090  ;
  NCweeksVal[210] = 191.2413  ;
  NCweeksVal[211] = 192.0731  ;
  NCweeksVal[212] = 192.9041  ;
  NCweeksVal[213] = 193.7345  ;
  NCweeksVal[214] = 194.5642  ;
  NCweeksVal[215] = 195.3933  ;
  NCweeksVal[216] = 196.2217  ;
  NCweeksVal[217] = 197.0495  ;
  NCweeksVal[218] = 197.8766  ;
  NCweeksVal[219] = 198.7030  ;
  NCweeksVal[220] = 199.5288  ;
  NCweeksVal[221] = 200.3540  ;
  NCweeksVal[222] = 201.1785  ;
  NCweeksVal[223] = 202.0023  ;
  NCweeksVal[224] = 202.8255  ;
  NCweeksVal[225] = 203.6480  ;
  NCweeksVal[226] = 204.4699  ;
  NCweeksVal[227] = 205.2911  ;
  NCweeksVal[228] = 206.1117  ;
  NCweeksVal[229] = 206.9317  ;
  NCweeksVal[230] = 207.7510  ;
  NCweeksVal[231] = 208.5697  ;
  NCweeksVal[232] = 209.3877  ;
  NCweeksVal[233] = 210.2050  ;
  NCweeksVal[234] = 211.0218  ;
  NCweeksVal[235] = 211.8379  ;
  NCweeksVal[236] = 212.6533  ;
  NCweeksVal[237] = 213.4682  ;
  NCweeksVal[238] = 214.2824  ;
  NCweeksVal[239] = 215.0959  ;
  NCweeksVal[240] = 215.9088  ;
  NCweeksVal[241] = 216.7211  ;
  NCweeksVal[242] = 217.5328  ;
  NCweeksVal[243] = 218.3438  ;
  NCweeksVal[244] = 219.1542  ;
  NCweeksVal[245] = 219.9639  ;
  NCweeksVal[246] = 220.7731  ;
  NCweeksVal[247] = 221.5816  ;
  NCweeksVal[248] = 222.3895  ;
  NCweeksVal[249] = 223.1967  ;
  NCweeksVal[250] = 224.0033  ;
  NCweeksVal[251] = 224.8093  ;
  NCweeksVal[252] = 225.6147  ;
  NCweeksVal[253] = 226.4195  ;
  NCweeksVal[254] = 227.2236  ;
  NCweeksVal[255] = 228.0272  ;
  NCweeksVal[256] = 228.8301  ;
  NCweeksVal[257] = 229.6323  ;
  NCweeksVal[258] = 230.4340  ;
  NCweeksVal[259] = 231.2351  ;
  NCweeksVal[260] = 232.0355  ;
  NCweeksVal[261] = 232.8353  ;
  NCweeksVal[262] = 233.6345  ;
  NCweeksVal[263] = 234.4331  ;
  NCweeksVal[264] = 235.2311  ;
  NCweeksVal[265] = 236.0285  ;
  NCweeksVal[266] = 236.8253  ;
  NCweeksVal[267] = 237.6214  ;
  NCweeksVal[268] = 238.4170  ;
  NCweeksVal[269] = 239.2119  ;
  NCweeksVal[270] = 240.0063  ;
  NCweeksVal[271] = 240.8000  ;
  NCweeksVal[272] = 241.5932  ;
  NCweeksVal[273] = 242.3857  ;
  NCweeksVal[274] = 243.1776  ;
  NCweeksVal[275] = 243.9689  ;
  NCweeksVal[276] = 244.7597  ;
  NCweeksVal[277] = 245.5498  ;
  NCweeksVal[278] = 246.3393  ;
  NCweeksVal[279] = 247.1283  ;
  NCweeksVal[280] = 247.9166  ;
  NCweeksVal[281] = 248.7043  ;
  NCweeksVal[282] = 249.4915  ;
  NCweeksVal[283] = 250.2780  ;
  NCweeksVal[284] = 251.0640  ;
  NCweeksVal[285] = 251.8494  ;
  NCweeksVal[286] = 252.6341  ;
  NCweeksVal[287] = 253.4183  ;
  NCweeksVal[288] = 254.2019  ;
  NCweeksVal[289] = 254.9849  ;
  NCweeksVal[290] = 255.7674  ;
  NCweeksVal[291] = 256.5492  ;
  NCweeksVal[292] = 257.3304  ;
  NCweeksVal[293] = 258.1111  ;
  NCweeksVal[284] = 258.8912  ;
  NCweeksVal[295] = 259.6707  ;
  NCweeksVal[296] = 260.4496  ;
  NCweeksVal[297] = 261.2279  ;
  NCweeksVal[298] = 262.0057  ;
  NCweeksVal[299] = 262.7829  ;
  NCweeksVal[300] = 263.5595  ;
  NCweeksVal[301] = 264.3355  ;
  NCweeksVal[302] = 265.1109  ;
  NCweeksVal[303] = 265.8858  ;
  NCweeksVal[304] = 266.6601  ;
  NCweeksVal[305] = 267.4338  ;
  NCweeksVal[306] = 268.2069  ;
  NCweeksVal[307] = 268.9795  ;
  NCweeksVal[308] = 269.7515  ;
  NCweeksVal[309] = 270.5229  ;
  NCweeksVal[310] = 271.2938  ;
  NCweeksVal[311] = 272.0641  ;
  NCweeksVal[312] = 272.8338  ;
  NCweeksVal[313] = 273.6029  ;
  NCweeksVal[314] = 274.3715  ;
  NCweeksVal[315] = 275.1395  ;
  NCweeksVal[316] = 275.9070  ;
  NCweeksVal[317] = 276.6739  ;
  NCweeksVal[318] = 277.4402  ;
  NCweeksVal[319] = 278.2060  ;
  NCweeksVal[320] = 278.9712  ;
  NCweeksVal[321] = 279.7358  ;
  NCweeksVal[322] = 280.4999  ;
  NCweeksVal[323] = 281.2634  ;
  NCweeksVal[324] = 282.0264  ;
  NCweeksVal[325] = 282.7888  ;
  NCweeksVal[326] = 283.5506  ;
  NCweeksVal[327] = 284.3119  ;
  NCweeksVal[328] = 285.0726  ;
  NCweeksVal[329] = 285.8328  ;
  NCweeksVal[330] = 286.5924  ;
  NCweeksVal[331] = 287.3515  ;
  NCweeksVal[332] = 288.1100  ;
  NCweeksVal[333] = 288.8680  ;
  NCweeksVal[334] = 289.6254  ;
  NCweeksVal[335] = 290.3823  ;
  NCweeksVal[336] = 291.1386  ;
  NCweeksVal[337] = 291.8944  ;
  NCweeksVal[338] = 292.6496  ;
  NCweeksVal[339] = 293.4043  ;
  NCweeksVal[340] = 294.1584  ;
  NCweeksVal[341] = 294.9120  ;
  NCweeksVal[342] = 295.6650  ;
  NCweeksVal[343] = 296.4175  ;
  NCweeksVal[344] = 297.1695  ;
  NCweeksVal[345] = 297.9209  ;
  NCweeksVal[346] = 298.6718  ;
  NCweeksVal[347] = 299.4221  ;
  NCweeksVal[348] = 300.1719  ;
  NCweeksVal[349] = 300.9212  ;
  NCweeksVal[350] = 301.6699  ;
  NCweeksVal[351] = 302.4181  ;
  NCweeksVal[352] = 303.1657  ;
  NCweeksVal[353] = 303.9128  ;
  NCweeksVal[354] = 304.6594  ;
  NCweeksVal[355] = 305.4054  ;
  NCweeksVal[356] = 306.1509  ;
  NCweeksVal[357] = 306.8959  ;
  NCweeksVal[358] = 307.6403  ;
  NCweeksVal[359] = 308.3843  ;
  NCweeksVal[360] = 309.1276  ;
  NCweeksVal[361] = 309.8705  ;
  NCweeksVal[362] = 310.6128  ;
  NCweeksVal[363] = 311.3546  ;
  NCweeksVal[364] = 312.0959  ;
  NCweeksVal[365] = 312.8366  ;
  NCweeksVal[366] = 313.5768  ;
  NCweeksVal[367] = 314.3165  ;
  NCweeksVal[368] = 315.0557  ;
  NCweeksVal[369] = 315.7943  ;
  NCweeksVal[370] = 316.5324  ;
  NCweeksVal[371] = 317.2700  ;
  NCweeksVal[372] = 318.0071  ;
  NCweeksVal[373] = 318.7437  ;
  NCweeksVal[374] = 319.4797  ;
  NCweeksVal[375] = 320.2152  ;
  NCweeksVal[376] = 320.9502  ;
  NCweeksVal[377] = 321.6847  ;
  NCweeksVal[378] = 322.4187  ;
  NCweeksVal[379] = 323.1521  ;
  NCweeksVal[380] = 323.8851  ;
  NCweeksVal[381] = 324.6175  ;
  NCweeksVal[382] = 325.3494  ;
  NCweeksVal[383] = 326.0808  ;
  NCweeksVal[384] = 326.8116  ;
  NCweeksVal[385] = 327.5420  ;
  NCweeksVal[386] = 328.2719  ;
  NCweeksVal[387] = 329.0012  ;
  NCweeksVal[388] = 329.7300  ;
  NCweeksVal[389] = 330.4584  ;
  NCweeksVal[390] = 331.1862  ;
  NCweeksVal[391] = 331.9135  ;
  NCweeksVal[392] = 332.6403  ;
  NCweeksVal[393] = 333.3666  ;
  NCweeksVal[394] = 334.0924  ;
  NCweeksVal[395] = 334.8177  ;
  NCweeksVal[396] = 335.5424  ;
  NCweeksVal[397] = 336.2667  ;
  NCweeksVal[398] = 336.9905  ;
  NCweeksVal[399] = 337.7138  ;
  NCweeksVal[400] = 338.4365  ;
  NCweeksVal[401] = 339.1588  ;
  NCweeksVal[402] = 339.8806  ;
  NCweeksVal[403] = 340.6019  ;
  NCweeksVal[404] = 341.3226  ;
  NCweeksVal[405] = 342.0429  ;
  NCweeksVal[406] = 342.7627  ;
  NCweeksVal[407] = 343.4820  ;
  NCweeksVal[408] = 344.2008  ;
  NCweeksVal[409] = 344.9190  ;
  NCweeksVal[410] = 345.6368  ;
  NCweeksVal[411] = 346.3541  ;
  NCweeksVal[412] = 347.0710  ;
  NCweeksVal[413] = 347.7873  ;
  NCweeksVal[414] = 348.5031  ;
  NCweeksVal[415] = 349.2184  ;
  NCweeksVal[416] = 349.9333  ;
  NCweeksVal[417] = 350.6476  ;
  NCweeksVal[418] = 351.3615  ;
  NCweeksVal[419] = 352.0749  ;
  NCweeksVal[420] = 352.7878  ;
  NCweeksVal[421] = 353.5002  ;
  NCweeksVal[422] = 354.2121  ;
  NCweeksVal[423] = 354.9235  ;
  NCweeksVal[424] = 355.6345  ;
  NCweeksVal[425] = 356.3449  ;
  NCweeksVal[426] = 357.0549  ;
  NCweeksVal[427] = 357.7644  ;
  NCweeksVal[428] = 358.4734  ;
  NCweeksVal[429] = 359.1820  ;
  NCweeksVal[430] = 359.8900  ;
  NCweeksVal[431] = 360.5976  ;
  NCweeksVal[432] = 361.3047  ;
  NCweeksVal[433] = 362.0113  ;
  NCweeksVal[434] = 362.7174  ;
  NCweeksVal[435] = 363.4231  ;
  NCweeksVal[436] = 364.1282  ;
  NCweeksVal[437] = 364.8329  ;
  NCweeksVal[438] = 365.5372  ;
  NCweeksVal[439] = 366.2409  ;
  NCweeksVal[440] = 366.9442  ;
  NCweeksVal[441] = 367.6470  ;
  NCweeksVal[442] = 368.3493  ;
  NCweeksVal[443] = 369.0512  ;
  NCweeksVal[444] = 369.7526  ;
  NCweeksVal[445] = 370.4535  ;
  NCweeksVal[446] = 371.1539  ;
  NCweeksVal[447] = 371.8539  ;
  NCweeksVal[448] = 372.5534  ;
  NCweeksVal[449] = 373.2524  ;
  NCweeksVal[450] = 373.9510  ;
  NCweeksVal[451] = 374.6491  ;
  NCweeksVal[452] = 375.3467  ;
  NCweeksVal[453] = 376.0439  ;
  NCweeksVal[454] = 376.7406  ;
  NCweeksVal[455] = 377.4368  ;
  NCweeksVal[456] = 378.1326  ;
  NCweeksVal[457] = 378.8279  ;
  NCweeksVal[458] = 379.5227  ;
  NCweeksVal[459] = 380.2171  ;
  NCweeksVal[460] = 380.9110  ;
  NCweeksVal[461] = 381.6045  ;
  NCweeksVal[462] = 382.2975  ;
  NCweeksVal[463] = 382.9900  ;
  NCweeksVal[464] = 383.6821  ;
  NCweeksVal[465] = 384.3737  ;
  NCweeksVal[466] = 385.0648  ;
  NCweeksVal[467] = 385.7555  ;
  NCweeksVal[468] = 386.4458  ;
  NCweeksVal[469] = 387.1356  ;
  NCweeksVal[470] = 387.8249  ;
  NCweeksVal[471] = 388.5138  ;
  NCweeksVal[472] = 389.2022  ;
  NCweeksVal[473] = 389.8902  ;
  NCweeksVal[474] = 390.5777  ;
  NCweeksVal[475] = 391.2547  ;
  NCweeksVal[476] = 391.9513  ;
  NCweeksVal[477] = 392.6375  ;
  NCweeksVal[478] = 393.3232  ;
  NCweeksVal[479] = 394.0085  ;
  NCweeksVal[480] = 394.6933  ;
  NCweeksVal[481] = 395.3776  ;
  NCweeksVal[482] = 396.0615  ;
  NCweeksVal[483] = 396.7450  ;
  NCweeksVal[484] = 397.4280  ;
  NCweeksVal[485] = 398.1105  ;
  NCweeksVal[486] = 398.7927  ;
  NCweeksVal[487] = 399.4743  ;
  NCweeksVal[488] = 400.1555  ;
  NCweeksVal[489] = 400.8363  ;
  NCweeksVal[490] = 401.5167  ;
  NCweeksVal[491] = 402.1966  ;
  NCweeksVal[492] = 402.8760  ;
  NCweeksVal[493] = 403.5550  ;
  NCweeksVal[494] = 404.2336  ;
  NCweeksVal[495] = 404.9117  ;
  NCweeksVal[496] = 405.5894  ;
  NCweeksVal[497] = 406.2666  ;
  NCweeksVal[498] = 406.9434  ;
  NCweeksVal[499] = 407.6198  ;
  NCweeksVal[500] = 408.2957  ;


  $('#nc_commuted_value_calculator').validate({
     rules: {
       numWeeks: {
         required: true,
         number: true,
         min: 0,
         max: 500
       },
       payments: {
         required: false,
         number: true,
         min: 0
       }
     }
  });

  $('#nc_commuted_value_calculator').submit(function(){
     if($('#nc_commuted_value_calculator').valid()){
      var weeks = ($("#numWeeks").val());
      var payment = 0;
      if($("#payments").val())
        payment = ($("#payments").val());
      else
        payment = -1;
      var paymentType = ($("#nc_commuted_value_calculator input[name='paymentType']:checked").val());
      if(paymentType == 1){
        weeks = 500-weeks;
      }
      var NC_PVofWeeks = NCweeksVal[weeks];
      $("#presentValueOfWeeks").html(NC_PVofWeeks);
      var value = NCcalculateValue(payment, NC_PVofWeeks);
      value = Math.round(value*100)/100;
      value = insertCommas(value);
      $("#presentValue").html(value);
     }
      return false;
  });

  function NCcalculateValue(payment, pv){
      if(payment == -1){
        return pv;
      }
      var total = pv * payment;
      return total;
  }

});
// SC Commuted Value Calculator
jQuery(document).ready(function($){

  var SCweeksVal = new Array();
  SCweeksVal[ 1 ] = 0.9996  ;
  SCweeksVal[ 2 ] = 1.9988  ;
  SCweeksVal[ 3 ] = 2.9977  ;
  SCweeksVal[ 4 ] = 3.9962  ;
  SCweeksVal[ 5 ] = 4.9942  ;
  SCweeksVal[ 6 ] = 5.9919  ;
  SCweeksVal[ 7 ] = 6.9892  ;
  SCweeksVal[ 8 ] = 7.9862  ;
  SCweeksVal[ 9 ] = 8.9827  ;
  SCweeksVal[ 10  ] = 9.9789  ;
  SCweeksVal[ 11  ] = 10.9747 ;
  SCweeksVal[ 12  ] = 11.9701 ;
  SCweeksVal[ 13  ] = 12.9651 ;
  SCweeksVal[ 14  ] = 13.9597 ;
  SCweeksVal[ 15  ] = 14.9539 ;
  SCweeksVal[ 16  ] = 15.9478 ;
  SCweeksVal[ 17  ] = 16.9413 ;
  SCweeksVal[ 18  ] = 17.9344 ;
  SCweeksVal[ 19  ] = 18.9271 ;
  SCweeksVal[ 20  ] = 19.9195 ;
  SCweeksVal[ 21  ] = 20.9114 ;
  SCweeksVal[ 22  ] = 21.903  ;
  SCweeksVal[ 23  ] = 22.8942 ;
  SCweeksVal[ 24  ] = 23.885  ;
  SCweeksVal[ 25  ] = 24.8754 ;
  SCweeksVal[ 26  ] = 25.8655 ;
  SCweeksVal[ 27  ] = 26.8552 ;
  SCweeksVal[ 28  ] = 27.8444 ;
  SCweeksVal[ 29  ] = 28.8334 ;
  SCweeksVal[ 30  ] = 29.8219 ;
  SCweeksVal[ 31  ] = 30.81 ;
  SCweeksVal[ 32  ] = 31.7978 ;
  SCweeksVal[ 33  ] = 32.7852 ;
  SCweeksVal[ 34  ] = 33.7722 ;
  SCweeksVal[ 35  ] = 34.7588 ;
  SCweeksVal[ 36  ] = 35.7451 ;
  SCweeksVal[ 37  ] = 36.731  ;
  SCweeksVal[ 38  ] = 37.7165 ;
  SCweeksVal[ 39  ] = 38.7016 ;
  SCweeksVal[ 40  ] = 39.6863 ;
  SCweeksVal[ 41  ] = 40.6707 ;
  SCweeksVal[ 42  ] = 41.6546 ;
  SCweeksVal[ 43  ] = 42.6382 ;
  SCweeksVal[ 44  ] = 43.6215 ;
  SCweeksVal[ 45  ] = 44.6043 ;
  SCweeksVal[ 46  ] = 45.5868 ;
  SCweeksVal[ 47  ] = 46.5689 ;
  SCweeksVal[ 48  ] = 47.5506 ;
  SCweeksVal[ 49  ] = 48.5319 ;
  SCweeksVal[ 50  ] = 49.5129 ;
  SCweeksVal[ 51  ] = 50.4934 ;
  SCweeksVal[ 52  ] = 51.4736 ;
  SCweeksVal[ 53  ] = 52.4535 ;
  SCweeksVal[ 54  ] = 53.4329 ;
  SCweeksVal[ 55  ] = 54.412  ;
  SCweeksVal[ 56  ] = 55.3907 ;
  SCweeksVal[ 57  ] = 56.369  ;
  SCweeksVal[ 58  ] = 57.347  ;
  SCweeksVal[ 59  ] = 58.3245 ;
  SCweeksVal[ 60  ] = 59.3017 ;
  SCweeksVal[ 61  ] = 60.2785 ;
  SCweeksVal[ 62  ] = 61.255  ;
  SCweeksVal[ 63  ] = 62.231  ;
  SCweeksVal[ 64  ] = 63.2067 ;
  SCweeksVal[ 65  ] = 64.182  ;
  SCweeksVal[ 66  ] = 65.157  ;
  SCweeksVal[ 67  ] = 66.1315 ;
  SCweeksVal[ 68  ] = 67.1057 ;
  SCweeksVal[ 69  ] = 68.0796 ;
  SCweeksVal[ 70  ] = 69.053  ;
  SCweeksVal[ 71  ] = 70.0261 ;
  SCweeksVal[ 72  ] = 70.9988 ;
  SCweeksVal[ 73  ] = 71.9711 ;
  SCweeksVal[ 74  ] = 72.943  ;
  SCweeksVal[ 75  ] = 73.9146 ;
  SCweeksVal[ 76  ] = 74.8858 ;
  SCweeksVal[ 77  ] = 75.8566 ;
  SCweeksVal[ 78  ] = 76.8271 ;
  SCweeksVal[ 79  ] = 77.7971 ;
  SCweeksVal[ 80  ] = 78.7668 ;
  SCweeksVal[ 81  ] = 79.7362 ;
  SCweeksVal[ 82  ] = 80.7051 ;
  SCweeksVal[ 83  ] = 81.6737 ;
  SCweeksVal[ 84  ] = 82.6419 ;
  SCweeksVal[ 85  ] = 83.6098 ;
  SCweeksVal[ 86  ] = 84.5772 ;
  SCweeksVal[ 87  ] = 85.5443 ;
  SCweeksVal[ 88  ] = 86.5111 ;
  SCweeksVal[ 89  ] = 87.4774 ;
  SCweeksVal[ 90  ] = 88.4434 ;
  SCweeksVal[ 91  ] = 89.409  ;
  SCweeksVal[ 92  ] = 90.3743 ;
  SCweeksVal[ 93  ] = 91.3391 ;
  SCweeksVal[ 94  ] = 92.3036 ;
  SCweeksVal[ 95  ] = 93.2678 ;
  SCweeksVal[ 96  ] = 94.2315 ;
  SCweeksVal[ 97  ] = 95.1949 ;
  SCweeksVal[ 98  ] = 96.1579 ;
  SCweeksVal[ 99  ] = 97.1206 ;
  SCweeksVal[ 100 ] = 98.0828 ;
  // new vals after 100
   SCweeksVal[ 101 ] =  99.5259;
 SCweeksVal[ 102 ] =  100.4777;
 SCweeksVal[ 103 ] =  101.4292;
 SCweeksVal[ 104 ] =  102.3802;
 SCweeksVal[ 105 ] =  103.3307;
 SCweeksVal[ 106 ] =  104.2807;
 SCweeksVal[ 107 ] =  105.2303;
 SCweeksVal[ 108 ] =  106.1795;
 SCweeksVal[ 109 ] =  107.1282;
 SCweeksVal[ 110 ] =  108.0765;
 SCweeksVal[ 111 ] =  109.0242;
 SCweeksVal[ 112 ] =  109.9716;
 SCweeksVal[ 113 ] =  110.9185;
 SCweeksVal[ 114 ] =  111.8649;
 SCweeksVal[ 115 ] =  112.8109;
 SCweeksVal[ 116 ] =  113.7564;
 SCweeksVal[ 117 ] =  114.7015;
 SCweeksVal[ 118 ] =  115.6461;
 SCweeksVal[ 119 ] =  116.5903;
 SCweeksVal[ 120 ] =  117.5340;
 SCweeksVal[ 121 ] =  118.4773;
 SCweeksVal[ 122 ] =  119.4201;
 SCweeksVal[ 123 ] =  120.3625;
 SCweeksVal[ 124 ] =  121.3044;
 SCweeksVal[ 125 ] =  122.2458;
 SCweeksVal[ 126 ] =  123.1868;
 SCweeksVal[ 127 ] =  124.1274;
 SCweeksVal[ 128 ] =  125.0675;
 SCweeksVal[ 129 ] =  126.0072;
 SCweeksVal[ 130 ] =  126.9464;
 SCweeksVal[ 131 ] =  127.8852;
 SCweeksVal[ 132 ] =  128.8235;
 SCweeksVal[ 133 ] =  129.7613;
 SCweeksVal[ 134 ] =  130.6987;
 SCweeksVal[ 135 ] =  131.6357;
 SCweeksVal[ 136 ] =  132.5722;
 SCweeksVal[ 137 ] =  133.5083;
 SCweeksVal[ 138 ] =  134.4439;
 SCweeksVal[ 139 ] =  135.3791;
 SCweeksVal[ 140 ] =  136.3138;
 SCweeksVal[ 141 ] =  137.2481;
 SCweeksVal[ 142 ] =  138.1819;
 SCweeksVal[ 143 ] =  139.1153;
 SCweeksVal[ 144 ] =  140.0483;
 SCweeksVal[ 145 ] =  140.9808;
 SCweeksVal[ 146 ] =  141.9128;
 SCweeksVal[ 147 ] =  142.8444;
 SCweeksVal[ 148 ] =  143.7756;
 SCweeksVal[ 149 ] =  144.7063;
 SCweeksVal[ 150 ] =  145.6365;
 SCweeksVal[ 151 ] =  146.5663;
 SCweeksVal[ 152 ] =  147.4957;
 SCweeksVal[ 153 ] =  148.4246;
 SCweeksVal[ 154 ] =  149.3531;
 SCweeksVal[ 155 ] =  150.2812;
 SCweeksVal[ 156 ] =  151.2088;
 SCweeksVal[ 157 ] =  152.1359;
 SCweeksVal[ 158 ] =  153.0626;
 SCweeksVal[ 159 ] =  153.9889;
 SCweeksVal[ 160 ] =  154.9147;
 SCweeksVal[ 161 ] =  155.8401;
 SCweeksVal[ 162 ] =  156.7650;
 SCweeksVal[ 163 ] =  157.6895;
 SCweeksVal[ 164 ] =  158.6135;
 SCweeksVal[ 165 ] =  159.5372;
 SCweeksVal[ 166 ] =  160.4603;
 SCweeksVal[ 167 ] =  161.3830;
 SCweeksVal[ 168 ] =  162.3053;
 SCweeksVal[ 169 ] =  163.2272;
 SCweeksVal[ 170 ] =  164.1486;
 SCweeksVal[ 171 ] =  165.0695;
 SCweeksVal[ 172 ] =  165.9900;
 SCweeksVal[ 173 ] =  166.9101;
 SCweeksVal[ 174 ] =  167.8297;
 SCweeksVal[ 175 ] =  168.7489;
 SCweeksVal[ 176 ] =  169.6677;
 SCweeksVal[ 177 ] =  170.5860;
 SCweeksVal[ 178 ] =  171.5039;
 SCweeksVal[ 179 ] =  172.4213;
 SCweeksVal[ 180 ] =  173.3383;
 SCweeksVal[ 181 ] =  174.2549;
 SCweeksVal[ 182 ] =  175.1710;
 SCweeksVal[ 183 ] =  176.0867;
 SCweeksVal[ 184 ] =  177.0019;
 SCweeksVal[ 185 ] =  177.9167;
 SCweeksVal[ 186 ] =  178.8311;
 SCweeksVal[ 187 ] =  179.7450;
 SCweeksVal[ 188 ] =  180.6585;
 SCweeksVal[ 189 ] =  181.5716;
 SCweeksVal[ 190 ] =  182.4842;
 SCweeksVal[ 191 ] =  183.3964;
 SCweeksVal[ 192 ] =  184.3081;
 SCweeksVal[ 193 ] =  185.2194;
 SCweeksVal[ 194 ] =  186.1303;
 SCweeksVal[ 195 ] =  187.0407;
 SCweeksVal[ 196 ] =  187.9507;
 SCweeksVal[ 197 ] =  188.8603;
 SCweeksVal[ 198 ] =  189.7694;
 SCweeksVal[ 199 ] =  190.6781;
 SCweeksVal[ 200 ] =  191.5864;
 SCweeksVal[ 201 ] =  192.4942;
 SCweeksVal[ 202 ] =  193.4016;
 SCweeksVal[ 203 ] =  194.3086;
 SCweeksVal[ 204 ] =  195.2151;
 SCweeksVal[ 205 ] =  196.1212;
 SCweeksVal[ 206 ] =  197.0268;
 SCweeksVal[ 207 ] =  197.9320;
 SCweeksVal[ 208 ] =  198.8368;
 SCweeksVal[ 209 ] =  199.7412;
 SCweeksVal[ 210 ] =  200.6451;
 SCweeksVal[ 211 ] =  201.5486;
 SCweeksVal[ 212 ] =  202.4516;
 SCweeksVal[ 213 ] =  203.3543;
 SCweeksVal[ 214 ] =  204.2565;
 SCweeksVal[ 215 ] =  205.1582;
 SCweeksVal[ 216 ] =  206.0596;
 SCweeksVal[ 217 ] =  206.9605;
 SCweeksVal[ 218 ] =  207.8609;
 SCweeksVal[ 219 ] =  208.7610;
 SCweeksVal[ 220 ] =  209.6606;
 SCweeksVal[ 221 ] =  210.5597;
 SCweeksVal[ 222 ] =  211.4585;
 SCweeksVal[ 223 ] =  212.3568;
 SCweeksVal[ 224 ] =  214.3503;
 SCweeksVal[ 225 ] =  214.1521;
 SCweeksVal[ 226 ] =  215.0492;
 SCweeksVal[ 227 ] =  215.9458;
 SCweeksVal[ 228 ] =  216.8419;
 SCweeksVal[ 229 ] =  217.7377;
 SCweeksVal[ 230 ] =  218.6330;
 SCweeksVal[ 231 ] =  219.5278;
 SCweeksVal[ 232 ] =  220.4223;
 SCweeksVal[ 233 ] =  221.3163;
 SCweeksVal[ 234 ] =  222.2099;
 SCweeksVal[ 235 ] =  223.1031;
 SCweeksVal[ 236 ] =  223.9958;
 SCweeksVal[ 237 ] =  224.8881;
 SCweeksVal[ 238 ] =  225.7800;
 SCweeksVal[ 239 ] =  226.6715;
 SCweeksVal[ 240 ] =  227.5625;
 SCweeksVal[ 241 ] =  228.4531;
 SCweeksVal[ 242 ] =  229.3433;
 SCweeksVal[ 243 ] =  230.2331;
 SCweeksVal[ 244 ] =  231.1224;
 SCweeksVal[ 245 ] =  232.0113;
 SCweeksVal[ 246 ] =  232.8998;
 SCweeksVal[ 247 ] =  233.7878;
 SCweeksVal[ 248 ] =  234.6754;
 SCweeksVal[ 249 ] =  235.5626;
 SCweeksVal[ 250 ] =  236.4494;
 SCweeksVal[ 251 ] =  237.3358;
 SCweeksVal[ 252 ] =  238.2217;
 SCweeksVal[ 253 ] =  239.1072;
 SCweeksVal[ 254 ] =  239.9923;
 SCweeksVal[ 255 ] =  240.8769;
 SCweeksVal[ 256 ] =  241.7612;
 SCweeksVal[ 257 ] =  242.6450;
 SCweeksVal[ 258 ] =  243.5284;
 SCweeksVal[ 259 ] =  244.4113;
 SCweeksVal[ 260 ] =  245.2939;
 SCweeksVal[ 261 ] =  246.1760;
 SCweeksVal[ 262 ] =  247.0577;
 SCweeksVal[ 263 ] =  247.9390;
 SCweeksVal[ 264 ] =  248.8198;
 SCweeksVal[ 265 ] =  249.7003;
 SCweeksVal[ 266 ] =  250.5803;
 SCweeksVal[ 267 ] =  251.4599;
 SCweeksVal[ 268 ] =  252.3390;
 SCweeksVal[ 269 ] =  253.2178;
 SCweeksVal[ 270 ] =  254.0961;
 SCweeksVal[ 271 ] =  254.9740;
 SCweeksVal[ 272 ] =  255.8515;
 SCweeksVal[ 273 ] =  256.7286;
 SCweeksVal[ 274 ] =  257.6052;
 SCweeksVal[ 275 ] =  258.4814;
 SCweeksVal[ 276 ] =  259.3572;
 SCweeksVal[ 277 ] =  260.2326;
 SCweeksVal[ 278 ] =  261.1076;
 SCweeksVal[ 279 ] =  261.9821;
 SCweeksVal[ 280 ] =  262.8563;
 SCweeksVal[ 281 ] =  263.7300;
 SCweeksVal[ 282 ] =  264.6033;
 SCweeksVal[ 283 ] =  265.4762;
 SCweeksVal[ 284 ] =  266.3486;
 SCweeksVal[ 285 ] =  267.2207;
 SCweeksVal[ 286 ] =  268.0923;
 SCweeksVal[ 287 ] =  268.9635;
 SCweeksVal[ 288 ] =  269.8343;
 SCweeksVal[ 289 ] =  270.7047;
 SCweeksVal[ 290 ] =  271.5746;
 SCweeksVal[ 291 ] =  272.4442;
 SCweeksVal[ 292 ] =  273.3133;
 SCweeksVal[ 293 ] =  274.1820;
 SCweeksVal[ 294 ] =  275.0503;
 SCweeksVal[ 295 ] =  275.9182;
 SCweeksVal[ 296 ] =  276.7856;
 SCweeksVal[ 297 ] =  277.6527;
 SCweeksVal[ 298 ] =  278.5193;
 SCweeksVal[ 299 ] =  279.3855;
 SCweeksVal[ 300 ] =  280.2513;
 SCweeksVal[ 301 ] =  281.1167;
 SCweeksVal[ 302 ] =  281.9817;
 SCweeksVal[ 303 ] =  282.8463;
 SCweeksVal[ 304 ] =  283.7104;
 SCweeksVal[ 305 ] =  284.5741;
 SCweeksVal[ 306 ] =  285.4375;
 SCweeksVal[ 307 ] =  286.3004;
 SCweeksVal[ 308 ] =  287.1629;
 SCweeksVal[ 309 ] =  288.0249;
 SCweeksVal[ 310 ] =  288.8866;
 SCweeksVal[ 311 ] =  289.7479;
 SCweeksVal[ 312 ] =  290.6087;
 SCweeksVal[ 313 ] =  291.4691;
 SCweeksVal[ 314 ] =  292.3292;
 SCweeksVal[ 315 ] =  293.1888;
 SCweeksVal[ 316 ] =  294.0480;
 SCweeksVal[ 317 ] =  294.9067;
 SCweeksVal[ 318 ] =  295.7651;
 SCweeksVal[ 319 ] =  296.6231;
 SCweeksVal[ 320 ] =  297.4806;
 SCweeksVal[ 321 ] =  298.3378;
 SCweeksVal[ 322 ] =  299.1945;
 SCweeksVal[ 323 ] =  300.0508;
 SCweeksVal[ 324 ] =  300.9067;
 SCweeksVal[ 325 ] =  301.7622;
 SCweeksVal[ 326 ] =  302.6173;
 SCweeksVal[ 327 ] =  303.4720;
 SCweeksVal[ 328 ] =  304.3263;
 SCweeksVal[ 329 ] =  305.1802;
 SCweeksVal[ 330 ] =  306.0336;
 SCweeksVal[ 331 ] =  306.8867;
 SCweeksVal[ 332 ] =  307.7393;
 SCweeksVal[ 333 ] =  308.5915;
 SCweeksVal[ 334 ] =  309.4434;
 SCweeksVal[ 335 ] =  310.2948;
 SCweeksVal[ 336 ] =  311.1458;
 SCweeksVal[ 337 ] =  311.9964;
 SCweeksVal[ 338 ] =  312.8466;
 SCweeksVal[ 339 ] =  313.6964;
 SCweeksVal[ 340 ] =  314.5457;
 SCweeksVal[ 341 ] =  315.3947;
 SCweeksVal[ 342 ] =  316.2433;
 SCweeksVal[ 343 ] =  317.0915;
 SCweeksVal[ 344 ] =  317.9392;
 SCweeksVal[ 345 ] =  318.7866;
 SCweeksVal[ 346 ] =  319.6335;
 SCweeksVal[ 347 ] =  320.4800;
 SCweeksVal[ 348 ] =  321.3262;
 SCweeksVal[ 349 ] =  322.1719;
 SCweeksVal[ 350 ] =  323.0172;
 SCweeksVal[ 351 ] =  323.8622;
 SCweeksVal[ 352 ] =  324.7067;
 SCweeksVal[ 353 ] =  325.5508;
 SCweeksVal[ 354 ] =  326.3945;
 SCweeksVal[ 355 ] =  327.2378;
 SCweeksVal[ 356 ] =  328.0807;
 SCweeksVal[ 357 ] =  328.9232;
 SCweeksVal[ 358 ] =  329.7653;
 SCweeksVal[ 359 ] =  330.6070;
 SCweeksVal[ 360 ] =  331.4483;
 SCweeksVal[ 361 ] =  332.2891;
 SCweeksVal[ 362 ] =  333.1296;
 SCweeksVal[ 363 ] =  333.9697;
 SCweeksVal[ 364 ] =  334.8094;
 SCweeksVal[ 365 ] =  335.6487;
 SCweeksVal[ 366 ] =  336.4875;
 SCweeksVal[ 367 ] =  337.3260;
 SCweeksVal[ 368 ] =  338.1641;
 SCweeksVal[ 369 ] =  339.0017;
 SCweeksVal[ 370 ] =  339.8390;
 SCweeksVal[ 371 ] =  340.6759;
 SCweeksVal[ 372 ] =  341.5124;
 SCweeksVal[ 373 ] =  342.3484;
 SCweeksVal[ 374 ] =  343.1841;
 SCweeksVal[ 375 ] =  344.0194;
 SCweeksVal[ 376 ] =  344.8542;
 SCweeksVal[ 377 ] =  345.6887;
 SCweeksVal[ 378 ] =  346.5228;
 SCweeksVal[ 379 ] =  347.3564;
 SCweeksVal[ 380 ] =  348.1897;
 SCweeksVal[ 381 ] =  349.0226;
 SCweeksVal[ 382 ] =  349.8550;
 SCweeksVal[ 383 ] =  350.6871;
 SCweeksVal[ 384 ] =  351.5188;
 SCweeksVal[ 385 ] =  352.3501;
 SCweeksVal[ 386 ] =  353.1810;
 SCweeksVal[ 387 ] =  354.0114;
 SCweeksVal[ 388 ] =  354.8415;
 SCweeksVal[ 389 ] =  355.6712;
 SCweeksVal[ 390 ] =  356.5005;
 SCweeksVal[ 391 ] =  357.3294;
 SCweeksVal[ 392 ] =  358.1579;
 SCweeksVal[ 393 ] =  358.9860;
 SCweeksVal[ 394 ] =  359.8137;
 SCweeksVal[ 395 ] =  360.6410;
 SCweeksVal[ 396 ] =  361.4679;
 SCweeksVal[ 397 ] =  362.2944;
 SCweeksVal[ 398 ] =  363.1206;
 SCweeksVal[ 399 ] =  363.9463;
 SCweeksVal[ 400 ] =  364.7716;
 SCweeksVal[ 401 ] =  365.5966;
 SCweeksVal[ 402 ] =  366.4211;
 SCweeksVal[ 403 ] =  367.2452;
 SCweeksVal[ 404 ] =  368.0690;
 SCweeksVal[ 405 ] =  368.8923;
 SCweeksVal[ 406 ] =  369.7153;
 SCweeksVal[ 407 ] =  370.5379;
 SCweeksVal[ 408 ] =  371.3601;
 SCweeksVal[ 409 ] =  372.1818;
 SCweeksVal[ 410 ] =  373.0032;
 SCweeksVal[ 411 ] =  373.8242;
 SCweeksVal[ 412 ] =  374.6448;
 SCweeksVal[ 413 ] =  375.4650;
 SCweeksVal[ 414 ] =  376.2849;
 SCweeksVal[ 415 ] =  377.1043;
 SCweeksVal[ 416 ] =  377.9233;
 SCweeksVal[ 417 ] =  378.7420;
 SCweeksVal[ 418 ] =  379.5602;
 SCweeksVal[ 419 ] =  380.3781;
 SCweeksVal[ 420 ] =  381.1955;
 SCweeksVal[ 421 ] =  382.0126;
 SCweeksVal[ 422 ] =  382.8293;
 SCweeksVal[ 423 ] =  383.6456;
 SCweeksVal[ 424 ] =  384.4615;
 SCweeksVal[ 425 ] =  385.2770;
 SCweeksVal[ 426 ] =  386.0921;
 SCweeksVal[ 427 ] =  386.9068;
 SCweeksVal[ 428 ] =  387.7212;
 SCweeksVal[ 429 ] =  388.5351;
 SCweeksVal[ 430 ] =  389.3487;
 SCweeksVal[ 431 ] =  390.1619;
 SCweeksVal[ 432 ] =  390.9747;
 SCweeksVal[ 433 ] =  391.7870;
 SCweeksVal[ 434 ] =  392.5991;
 SCweeksVal[ 435 ] =  393.4107;
 SCweeksVal[ 436 ] =  394.2219;
 SCweeksVal[ 437 ] =  395.0327;
 SCweeksVal[ 438 ] =  395.8432;
 SCweeksVal[ 439 ] =  396.6533;
 SCweeksVal[ 440 ] =  397.4629;
 SCweeksVal[ 441 ] =  398.2722;
 SCweeksVal[ 442 ] =  399.0811;
 SCweeksVal[ 443 ] =  399.8896;
 SCweeksVal[ 444 ] =  400.6978;
 SCweeksVal[ 445 ] =  401.5055;
 SCweeksVal[ 446 ] =  402.3129;
 SCweeksVal[ 447 ] =  403.1198;
 SCweeksVal[ 448 ] =  403.9264;
 SCweeksVal[ 449 ] =  404.7326;
 SCweeksVal[ 450 ] =  405.5384;
 SCweeksVal[ 451 ] =  406.3438;
 SCweeksVal[ 452 ] =  407.1489;
 SCweeksVal[ 453 ] =  407.9535;
 SCweeksVal[ 454 ] =  408.7578;
 SCweeksVal[ 455 ] =  409.5617;
 SCweeksVal[ 456 ] =  410.3652;
 SCweeksVal[ 457 ] =  411.1683;
 SCweeksVal[ 458 ] =  411.9710;
 SCweeksVal[ 459 ] =  412.7734;
 SCweeksVal[ 460 ] =  413.5753;
 SCweeksVal[ 461 ] =  414.3769;
 SCweeksVal[ 462 ] =  415.1781;
 SCweeksVal[ 463 ] =  415.9789;
 SCweeksVal[ 464 ] =  416.7793;
 SCweeksVal[ 465 ] =  417.5794;
 SCweeksVal[ 466 ] =  418.3790;
 SCweeksVal[ 467 ] =  419.1783;
 SCweeksVal[ 468 ] =  419.9772;
 SCweeksVal[ 469 ] =  420.7757;
 SCweeksVal[ 470 ] =  421.5739;
 SCweeksVal[ 471 ] =  422.3716;
 SCweeksVal[ 472 ] =  423.1690;
 SCweeksVal[ 473 ] =  423.9660;
 SCweeksVal[ 474 ] =  424.7626;
 SCweeksVal[ 475 ] =  425.5588;
 SCweeksVal[ 476 ] =  426.3546;
 SCweeksVal[ 477 ] =  427.1501;
 SCweeksVal[ 478 ] =  427.9452;
 SCweeksVal[ 479 ] =  428.7399;
 SCweeksVal[ 480 ] =  429.5342;
 SCweeksVal[ 481 ] =  430.3281;
 SCweeksVal[ 482 ] =  431.1217;
 SCweeksVal[ 483 ] =  431.9149;
 SCweeksVal[ 484 ] =  432.7077;
 SCweeksVal[ 485 ] =  433.5001;
 SCweeksVal[ 486 ] =  434.2921;
 SCweeksVal[ 487 ] =  435.0838;
 SCweeksVal[ 488 ] =  435.8751;
 SCweeksVal[ 489 ] =  436.6660;
 SCweeksVal[ 490 ] =  437.4565;
 SCweeksVal[ 491 ] =  438.2466;
 SCweeksVal[ 492 ] =  439.0364;
 SCweeksVal[ 493 ] =  439.8258;
 SCweeksVal[ 494 ] =  440.6148;
 SCweeksVal[ 495 ] =  441.4035;
 SCweeksVal[ 496 ] =  442.1917;
 SCweeksVal[ 497 ] =  442.9796;
 SCweeksVal[ 498 ] =  443.7671;
 SCweeksVal[ 499 ] =  444.5542;
 SCweeksVal[ 500 ] =  445.3410;

  $('#sc_commuted_value_calculator').validate({
     rules: {
       numWeeks: {
         required: true,
         number: true,
         min: 0,
         max: 500
       },
       payments: {
         required: false,
         number: true,
         min: 0
       }
     }
  });

  $('#sc_commuted_value_calculator').submit(function(){
     if($('#sc_commuted_value_calculator').valid()){
      var weeks = ($("#numWeeks").val());
      var payment = 0;
      if($("#payments").val())
        payment = ($("#payments").val());
      else
        payment = -1;
      var paymentType = ($("#sc_commuted_value_calculator input[name='paymentType']:checked").val());
      if(paymentType == 1){
        weeks = 500-weeks;
      }
      var value = SCWeeksCalculateValue(payment, weeks);
      value = Math.round(value*100)/100;
      value = insertCommas(value);
      $("#presentValue").html(value);
     }
      return false;
  });

  function SCWeeksCalculateValue(payment, weeks){
      var PVofWeeks = SCweeksVal[weeks];
      if(payment == -1){
        return PVofWeeks;
      }
      var total = PVofWeeks * payment;
      return total;
  }

});

// Compensation Rate Calculator
jQuery(document).ready(function($){


  $('#sc_compensation_rate_calculator').validate({
     rules: {
       aww: {
         required: true,
         number: true,
         min: 0
       },
       year: {
         required: true,
         number: true,
         min: 2003,
         max: 2018
       }
     }
  });

    $('#sc_compensation_rate_calculator').submit(function(){
      if($('#sc_compensation_rate_calculator').valid()){
        var aww = parseFloat($("#aww").val());
        var year = parseFloat($("#year").val());
        var value = SCcalculateValue(aww, year);
        value = Math.round(value*100)/100;
        value = insertCommas(value);
        value = insertTrailingZeros(value);
        $("#crc").html(value);
      }
      return false;
    });

    function SCcalculateValue(aww, year){
      var compRate = 0;
      switch(year){
        case 2003:
          if(aww > 845.33)
            compRate = 563.55;
          break;
        case 2004:
          if(aww > 866.60)
            compRate = 577.73;
          break;
        case 2005:
          if(aww > 889.00)
            compRate = 592.56;
          break;
        case 2006:
          if(aww > 924.67)
            compRate = 616.48;
          break;
        case 2007:
          if(aww > 968.43)
            compRate = 645.94;
          break;
        case 2008:
          if(aww > 991.44)
            compRate = 661.29;
          break;
        case 2009:
          if(aww > 1021.99)
            compRate = 681.36;
          break;
        case 2010:
          if(aww > 1039.56)
            compRate = 689.71;
          break;
        case 2011:
          if(aww > 1057.32)
            compRate = 704.92;
          break;
        case 2012:
          if(aww > 1088.21)
            compRate = 725.47;
          break;
        case 2013:
          if(aww > 1115.53)
            compRate = 743.72;
          break;
        case 2014:
          if(aww > 1128.19)
            compRate = 752.16;
          break;
        case 2015:
          if(aww > 1149.02)
            compRate = 766.05;
          break;
        case 2016:
          if(aww > 1149.01)
            compRate = 784.03;
          break;
        case 2017:
          if(aww > 1149.01)
            compRate = 806.82;
          break;
        case 2018:
          if(aww > 1257.25)
            compRate = 838.21;
          break;
      }

      if(compRate == 0)
        compRate = aww * .6667;
        return compRate;
    }

});

// SC PDD FORM
jQuery(document).ready(function ($)
{
  var SCppdForm = $('#sc_ppd');
  if (!SCppdForm.length) { return; }
  var SCppdInput = $('#sc_ppd input');
  var SCimage = $('#body_parts');

  SCppdForm.validate({
     rules: {
       compRate: {
         required: true,
         number: true,
         min: 0
       },
       rating: {
         required: true,
         number: true,
         min: 0,
         max: 100
       }
     }
  });

  SCimage.mapster({
    singleSelect : true,
    scaleMap: true,
    render_highlight : { altImage : 'http://www.gwblawfirm.com/wp-content/plugins/nice-calcs/images/body-parts-sc-active.png' },
    mapKey: 'class',
    fill : true, altImage : 'http://www.gwblawfirm.com/wp-content/plugins/nice-calcs/images/body-parts-sc-active.png',
    fillOpacity : 1,
    onClick: function (e) {

      if( ! SCppdForm.valid() ){
        alert('Please fill out the Compensation Rate and the Impairment Rating, then reslect your body part');
        // done to reset PPD form
        document.location.reload(true);
      };
      if($(this).attr("active") == "true"){

      }
      else
      {
        // console.log('this.data', this.dataset.comp);
        var weeks = this.dataset.comp;
        runPPDCalculation(weeks);
      }
    },

  });

});

// NC PDD FORM
jQuery(document).ready(function($) {
  var NCppdForm = $('#nc_ppd');
  if (!NCppdForm.length) {   return;  }
  var NCppdInput = $('#nc_ppd input');
  var NCimage = $('#body_parts');

  NCppdForm.validate({
     rules: {
       compRate: {
         required: true,
         number: true,
         min: 0
       },
       rating: {
         required: true,
         number: true,
         min: 0,
         max: 100
       }
     }
  });

  NCimage.mapster({
    singleSelect : true,
    scaleMap: true,
    render_highlight : { altImage : 'http://www.gwblawfirm.com/wp-content/plugins/nice-calcs/images/active-body-parts.png' },
    mapKey: 'class',
    fill : true, altImage : 'http://www.gwblawfirm.com/wp-content/plugins/nice-calcs/images/active-body-parts.png',
    fillOpacity : 1,
    onClick: function (e) {

      if( ! NCppdForm.valid() ){
        alert('Please fill out the Compensation Rate and the Impairment Rating, then reslect your body part');
        // done to reset PPD form
        document.location.reload(true);
      };
      if($(this).attr("active") == "true")
      {}
      else
      {
        var weeks = this.dataset.comp;
        runPPDCalculation(weeks);
      }
    },

  });
});

// Present Value Calculator
jQuery(document).ready(function ($)
{
  // validatoin


  var pvc = $('#pvc');
  var pvcInput = $('#pvc input');



  pvc.validate({
                rules: {
                  payment: {
                    required: true,
                    number: true
                  },
                  weeks: {
                    required: true,
                    number: true
                  },
                  rate: {
                    required: true,
                    number: true
                  },
                }
              });
  pvc.submit(function(){
    var pvc_payment   = $('#pvc input#payment').val();
    var pvc_weeks     = $('#pvc input#weeks').val();
    var pvc_rate      = $('#pvc input#rate').val();

    // event.preventDefault();
    /* Act on the event */
    if( ! pvc.valid() ){

      return;
    }
    var weeklyPayment = parseFloat( pvc_payment );
    var numberOfWeeks = parseFloat( pvc_weeks );
    var iRate = parseFloat( pvc_rate );
    var totalPayment = weeklyPayment * numberOfWeeks;
    var weeklyRate = ( iRate/100 ) / 52;
    var presentValue = (weeklyPayment/weeklyRate) * ( 1- Math.pow( (1+weeklyRate), -numberOfWeeks ));
    totalPayment = commaSeparateNumber( totalPayment.toFixed( 2 ) );
    presentValue = commaSeparateNumber( presentValue.toFixed( 2 ) );

    var pvcHtml  = '<p>Total Payment: $' + commaSeparateNumber( totalPayment ) + '</p>';
        pvcHtml += '<p>Present Value: $' + commaSeparateNumber( presentValue ) + '</p>';
    $('#pvc_result').html(pvcHtml);
  });

});

function commaSeparateNumber(val){
  var n= val.toString().split(".");
  //Comma-fies the first part
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //Combines the two sections
  return n.join(".");
}


/*
 * Originally taken from the site below. Modified to account for numbers with 2 decimal places.
 *
 * Original:  Martin Webb
 * Web Site:  http://www.irt.org

 * This script and many more are available free online at
 * The JavaScript Source!! http://javascript.internet.com
 */
function insertCommas(number) {
  number = '' + number;
  number = number.split(".");
  if (number[0].length > 3) {
    var mod = number[0].length % 3;
    var output = (mod > 0 ? (number[0].substring(0,mod)) : '');
    for (i=0 ; i < Math.floor(number[0].length / 3); i++) {
      if ((mod == 0) && (i == 0))
        output += number[0].substring(mod+ 3 * i, mod + 3 * i + 3);
      else
        output+= ',' + number[0].substring(mod + 3 * i, mod + 3 * i + 3);
    }
    if(number[1] != null)
      output = output + '.'+number[1];
    return insertTrailingZeros(output);
  }
  else{
    if(number[1] != null)
      number[0] = number[0] + '.'+number[1];
    return insertTrailingZeros(number[0]);
  }
}

function insertTrailingZeros(number){
  number = ''+number;
  number = number.split(".");
    if(number[1] == null)
    number[0] = number[0] + '.00';
    else if(number[1].length == 1)
      number[0] = number[0]+'.'+number[1] + '0';
    else if(number[1].length == 2)
      number[0] = number[0]+'.'+number[1];
    return number[0];
};


function NCcalculateValue(aww, year){
  var compRate = aww * .6667;
  switch(year){
    case 2004:
      if(compRate > 688.00)
        compRate = 688.00;
      break;
    case 2005:
      if(compRate > 704.00)
        compRate = 704.00;
      break;
    case 2006:
      if(compRate > 730.00)
        compRate = 730.00;
      break;
    case 2007:
      if(aww > 754.00)
        compRate = 754.00;
      break;
    case 2008:
      if(compRate > 786.00)
        compRate = 786.00;
      break;
    case 2009:
      if(compRate > 816.00)
        compRate = 816.00;
      break;
    case 2010:
      if(compRate > 834.00)
        compRate = 834.00;
      break;
    case 2011:
      if(compRate > 836.00)
        compRate = 836.00;
      break;
    case 2012:
      if(compRate > 862.00)
        compRate = 862.00;
      break;
    case 2013:
      if(compRate > 884.00)
        compRate = 884.00;
      break;
    case 2014:
      if(compRate > 904.00)
        compRate = 904.00;
      break;
    case 2015:
      if(compRate > 920.00)
        compRate = 920.00;
      break;
  }

  if(compRate < 30)
    compRate = 30.00;
    return compRate;
}

function runPPDCalculation(weeks){
  var compRate = parseFloat(jQuery("#compRate").val());
  var rating = parseFloat(jQuery("#rating").val());
  var value = calculatePPDValue(weeks, compRate, rating);
  value = Math.round(value*100)/100;
  if(!isNaN(value)){
    value = insertCommas(value);
    value = insertTrailingZeros(value);
    jQuery("#ppd").html(value);
  }
  else {
    jQuery("#ppd").html('<small class="error">Not valid, try again</small>');
  }
  return false;
}
function calculatePPDValue(weeks, compRate, rating){
        return weeks*compRate*(rating/100);
}
// EOF