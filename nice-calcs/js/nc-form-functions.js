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
  SCweeksVal[ 101 ] = 99.0447 ;
  SCweeksVal[ 102 ] = 100.0063  ;
  SCweeksVal[ 103 ] = 100.9675  ;
  SCweeksVal[ 104 ] = 101.9282  ;
  SCweeksVal[ 105 ] = 102.8887  ;
  SCweeksVal[ 106 ] = 103.8487  ;
  SCweeksVal[ 107 ] = 104.8084  ;
  SCweeksVal[ 108 ] = 105.7677  ;
  SCweeksVal[ 109 ] = 106.7267  ;
  SCweeksVal[ 110 ] = 107.6853  ;
  SCweeksVal[ 111 ] = 108.6435  ;
  SCweeksVal[ 112 ] = 109.6013  ;
  SCweeksVal[ 113 ] = 110.5588  ;
  SCweeksVal[ 114 ] = 111.5159  ;
  SCweeksVal[ 115 ] = 112.4727  ;
  SCweeksVal[ 116 ] = 113.429 ;
  SCweeksVal[ 117 ] = 114.385 ;
  SCweeksVal[ 118 ] = 115.3407  ;
  SCweeksVal[ 119 ] = 116.296 ;
  SCweeksVal[ 120 ] = 117.2509  ;
  SCweeksVal[ 121 ] = 118.2054  ;
  SCweeksVal[ 122 ] = 119.1596  ;
  SCweeksVal[ 123 ] = 120.1134  ;
  SCweeksVal[ 124 ] = 121.0668  ;
  SCweeksVal[ 125 ] = 122.0199  ;
  SCweeksVal[ 126 ] = 122.9726  ;
  SCweeksVal[ 127 ] = 123.9249  ;
  SCweeksVal[ 128 ] = 124.8769  ;
  SCweeksVal[ 129 ] = 125.8285  ;
  SCweeksVal[ 130 ] = 126.7797  ;
  SCweeksVal[ 131 ] = 127.7306  ;
  SCweeksVal[ 132 ] = 128.6811  ;
  SCweeksVal[ 133 ] = 129.6312  ;
  SCweeksVal[ 134 ] = 130.581 ;
  SCweeksVal[ 135 ] = 131.5304  ;
  SCweeksVal[ 136 ] = 132.4795  ;
  SCweeksVal[ 137 ] = 133.4282  ;
  SCweeksVal[ 138 ] = 134.3765  ;
  SCweeksVal[ 139 ] = 135.3244  ;
  SCweeksVal[ 140 ] = 136.272 ;
  SCweeksVal[ 141 ] = 137.2192  ;
  SCweeksVal[ 142 ] = 138.1661  ;
  SCweeksVal[ 143 ] = 139.1126  ;
  SCweeksVal[ 144 ] = 140.0587  ;
  SCweeksVal[ 145 ] = 141.0045  ;
  SCweeksVal[ 146 ] = 141.9499  ;
  SCweeksVal[ 147 ] = 142.8949  ;
  SCweeksVal[ 148 ] = 143.8396  ;
  SCweeksVal[ 149 ] = 144.7839  ;
  SCweeksVal[ 150 ] = 145.7279  ;
  SCweeksVal[ 151 ] = 146.6715  ;
  SCweeksVal[ 152 ] = 147.6147  ;
  SCweeksVal[ 153 ] = 148.5576  ;
  SCweeksVal[ 154 ] = 149.5001  ;
  SCweeksVal[ 155 ] = 150.4422  ;
  SCweeksVal[ 156 ] = 151.384 ;
  SCweeksVal[ 157 ] = 152.3254  ;
  SCweeksVal[ 158 ] = 153.2664  ;
  SCweeksVal[ 159 ] = 154.2071  ;
  SCweeksVal[ 160 ] = 155.1474  ;
  SCweeksVal[ 161 ] = 156.0874  ;
  SCweeksVal[ 162 ] = 157.027 ;
  SCweeksVal[ 163 ] = 157.9663  ;
  SCweeksVal[ 164 ] = 158.9051  ;
  SCweeksVal[ 165 ] = 159.8437  ;
  SCweeksVal[ 166 ] = 160.7818  ;
  SCweeksVal[ 167 ] = 161.7196  ;
  SCweeksVal[ 168 ] = 162.6571  ;
  SCweeksVal[ 169 ] = 163.5941  ;
  SCweeksVal[ 170 ] = 164.5309  ;
  SCweeksVal[ 171 ] = 165.4672  ;
  SCweeksVal[ 172 ] = 166.4032  ;
  SCweeksVal[ 173 ] = 167.3389  ;
  SCweeksVal[ 174 ] = 168.2741  ;
  SCweeksVal[ 175 ] = 169.2091  ;
  SCweeksVal[ 176 ] = 170.1436  ;
  SCweeksVal[ 177 ] = 171.0778  ;
  SCweeksVal[ 178 ] = 172.0117  ;
  SCweeksVal[ 179 ] = 172.9451  ;
  SCweeksVal[ 180 ] = 173.8783  ;
  SCweeksVal[ 181 ] = 174.811 ;
  SCweeksVal[ 182 ] = 175.7434  ;
  SCweeksVal[ 183 ] = 176.6755  ;
  SCweeksVal[ 184 ] = 177.6072  ;
  SCweeksVal[ 185 ] = 178.5385  ;
  SCweeksVal[ 186 ] = 179.4695  ;
  SCweeksVal[ 187 ] = 180.4001  ;
  SCweeksVal[ 188 ] = 181.3304  ;
  SCweeksVal[ 189 ] = 182.2603  ;
  SCweeksVal[ 190 ] = 183.1898  ;
  SCweeksVal[ 191 ] = 184.119 ;
  SCweeksVal[ 192 ] = 185.0478  ;
  SCweeksVal[ 193 ] = 185.9763  ;
  SCweeksVal[ 194 ] = 186.9044  ;
  SCweeksVal[ 195 ] = 187.8322  ;
  SCweeksVal[ 196 ] = 188.7596  ;
  SCweeksVal[ 197 ] = 189.6866  ;
  SCweeksVal[ 198 ] = 190.6133  ;
  SCweeksVal[ 199 ] = 191.5396  ;
  SCweeksVal[ 200 ] = 192.4656  ;
  SCweeksVal[ 201 ] = 193.3912  ;
  SCweeksVal[ 202 ] = 194.3165  ;
  SCweeksVal[ 203 ] = 195.2414  ;
  SCweeksVal[ 204 ] = 196.1659  ;
  SCweeksVal[ 205 ] = 197.0901  ;
  SCweeksVal[ 206 ] = 198.014 ;
  SCweeksVal[ 207 ] = 198.9375  ;
  SCweeksVal[ 208 ] = 199.8606  ;
  SCweeksVal[ 209 ] = 200.7834  ;
  SCweeksVal[ 210 ] = 201.7058  ;
  SCweeksVal[ 211 ] = 202.6278  ;
  SCweeksVal[ 212 ] = 203.5496  ;
  SCweeksVal[ 213 ] = 204.4709  ;
  SCweeksVal[ 214 ] = 205.3919  ;
  SCweeksVal[ 215 ] = 206.3126  ;
  SCweeksVal[ 216 ] = 207.2329  ;
  SCweeksVal[ 217 ] = 208.1528  ;
  SCweeksVal[ 218 ] = 209.0724  ;
  SCweeksVal[ 219 ] = 209.9916  ;
  SCweeksVal[ 220 ] = 210.9105  ;
  SCweeksVal[ 221 ] = 211.829 ;
  SCweeksVal[ 222 ] = 212.7472  ;
  SCweeksVal[ 223 ] = 213.665 ;
  SCweeksVal[ 224 ] = 214.5825  ;
  SCweeksVal[ 225 ] = 215.4996  ;
  SCweeksVal[ 226 ] = 216.4164  ;
  SCweeksVal[ 227 ] = 217.3328  ;
  SCweeksVal[ 228 ] = 218.2488  ;
  SCweeksVal[ 229 ] = 219.1646  ;
  SCweeksVal[ 230 ] = 220.0799  ;
  SCweeksVal[ 231 ] = 220.9949  ;
  SCweeksVal[ 232 ] = 221.9096  ;
  SCweeksVal[ 233 ] = 222.8239  ;
  SCweeksVal[ 234 ] = 223.7378  ;
  SCweeksVal[ 235 ] = 224.6514  ;
  SCweeksVal[ 236 ] = 225.5646  ;
  SCweeksVal[ 237 ] = 226.4775  ;
  SCweeksVal[ 238 ] = 227.3901  ;
  SCweeksVal[ 239 ] = 228.3023  ;
  SCweeksVal[ 240 ] = 229.2141  ;
  SCweeksVal[ 241 ] = 230.1256  ;
  SCweeksVal[ 242 ] = 231.0367  ;
  SCweeksVal[ 243 ] = 231.9475  ;
  SCweeksVal[ 244 ] = 232.858 ;
  SCweeksVal[ 245 ] = 233.7681  ;
  SCweeksVal[ 246 ] = 234.6778  ;
  SCweeksVal[ 247 ] = 235.5872  ;
  SCweeksVal[ 248 ] = 236.4962  ;
  SCweeksVal[ 249 ] = 237.4049  ;
  SCweeksVal[ 250 ] = 238.3133  ;
  SCweeksVal[ 251 ] = 239.2212  ;
  SCweeksVal[ 252 ] = 240.1289  ;
  SCweeksVal[ 253 ] = 241.0362  ;
  SCweeksVal[ 254 ] = 241.9431  ;
  SCweeksVal[ 255 ] = 242.8497  ;
  SCweeksVal[ 256 ] = 243.756 ;
  SCweeksVal[ 257 ] = 244.6619  ;
  SCweeksVal[ 258 ] = 245.5674  ;
  SCweeksVal[ 259 ] = 246.4726  ;
  SCweeksVal[ 260 ] = 247.3775  ;
  SCweeksVal[ 261 ] = 248.282 ;
  SCweeksVal[ 262 ] = 249.1861  ;
  SCweeksVal[ 263 ] = 250.09  ;
  SCweeksVal[ 264 ] = 250.9934  ;
  SCweeksVal[ 265 ] = 251.8965  ;
  SCweeksVal[ 266 ] = 252.7993  ;
  SCweeksVal[ 267 ] = 253.7017  ;
  SCweeksVal[ 268 ] = 254.6038  ;
  SCweeksVal[ 269 ] = 255.5055  ;
  SCweeksVal[ 270 ] = 256.4069  ;
  SCweeksVal[ 271 ] = 257.308 ;
  SCweeksVal[ 272 ] = 258.2086  ;
  SCweeksVal[ 273 ] = 259.109 ;
  SCweeksVal[ 274 ] = 260.009 ;
  SCweeksVal[ 275 ] = 260.9086  ;
  SCweeksVal[ 276 ] = 261.8079  ;
  SCweeksVal[ 277 ] = 262.7069  ;
  SCweeksVal[ 278 ] = 263.6055  ;
  SCweeksVal[ 279 ] = 264.5038  ;
  SCweeksVal[ 280 ] = 265.4017  ;
  SCweeksVal[ 281 ] = 266.2993  ;
  SCweeksVal[ 282 ] = 267.1965  ;
  SCweeksVal[ 283 ] = 268.0934  ;
  SCweeksVal[ 284 ] = 268.9899  ;
  SCweeksVal[ 285 ] = 269.8861  ;
  SCweeksVal[ 286 ] = 270.782 ;
  SCweeksVal[ 287 ] = 271.6775  ;
  SCweeksVal[ 288 ] = 272.5727  ;
  SCweeksVal[ 289 ] = 273.4675  ;
  SCweeksVal[ 290 ] = 274.362 ;
  SCweeksVal[ 291 ] = 275.2561  ;
  SCweeksVal[ 292 ] = 276.1499  ;
  SCweeksVal[ 293 ] = 277.0433  ;
  SCweeksVal[ 294 ] = 277.9364  ;
  SCweeksVal[ 295 ] = 278.8292  ;
  SCweeksVal[ 296 ] = 279.7216  ;
  SCweeksVal[ 297 ] = 280.6137  ;
  SCweeksVal[ 298 ] = 281.5054  ;
  SCweeksVal[ 299 ] = 282.3968  ;
  SCweeksVal[ 300 ] = 283.2878  ;
  SCweeksVal[ 301 ] = 284.1785  ;
  SCweeksVal[ 302 ] = 285.0689  ;
  SCweeksVal[ 303 ] = 285.9589  ;
  SCweeksVal[ 304 ] = 286.8486  ;
  SCweeksVal[ 305 ] = 287.7379  ;
  SCweeksVal[ 306 ] = 288.6269  ;
  SCweeksVal[ 307 ] = 289.5155  ;
  SCweeksVal[ 308 ] = 290.4039  ;
  SCweeksVal[ 309 ] = 291.2918  ;
  SCweeksVal[ 310 ] = 292.1794  ;
  SCweeksVal[ 311 ] = 293.0667  ;
  SCweeksVal[ 312 ] = 293.9537  ;
  SCweeksVal[ 313 ] = 294.8403  ;
  SCweeksVal[ 314 ] = 295.7265  ;
  SCweeksVal[ 315 ] = 296.6124  ;
  SCweeksVal[ 316 ] = 297.498 ;
  SCweeksVal[ 317 ] = 298.3833  ;
  SCweeksVal[ 318 ] = 299.2682  ;
  SCweeksVal[ 319 ] = 300.1527  ;
  SCweeksVal[ 320 ] = 301.0369  ;
  SCweeksVal[ 321 ] = 301.9208  ;
  SCweeksVal[ 322 ] = 302.8043  ;
  SCweeksVal[ 323 ] = 303.6875  ;
  SCweeksVal[ 324 ] = 304.5704  ;
  SCweeksVal[ 325 ] = 305.4529  ;
  SCweeksVal[ 326 ] = 306.3351  ;
  SCweeksVal[ 327 ] = 307.2169  ;
  SCweeksVal[ 328 ] = 308.0984  ;
  SCweeksVal[ 329 ] = 308.9796  ;
  SCweeksVal[ 330 ] = 309.8604  ;
  SCweeksVal[ 331 ] = 310.7409  ;
  SCweeksVal[ 332 ] = 311.621 ;
  SCweeksVal[ 333 ] = 312.5009  ;
  SCweeksVal[ 334 ] = 313.3803  ;
  SCweeksVal[ 335 ] = 314.2595  ;
  SCweeksVal[ 336 ] = 315.1382  ;
  SCweeksVal[ 337 ] = 316.0167  ;
  SCweeksVal[ 338 ] = 316.8948  ;
  SCweeksVal[ 339 ] = 317.7726  ;
  SCweeksVal[ 340 ] = 318.65  ;
  SCweeksVal[ 341 ] = 319.5271  ;
  SCweeksVal[ 342 ] = 320.4039  ;
  SCweeksVal[ 343 ] = 321.2803  ;
  SCweeksVal[ 344 ] = 322.1564  ;
  SCweeksVal[ 345 ] = 323.0322  ;
  SCweeksVal[ 346 ] = 323.9076  ;
  SCweeksVal[ 347 ] = 324.7827  ;
  SCweeksVal[ 348 ] = 325.6574  ;
  SCweeksVal[ 349 ] = 326.5319  ;
  SCweeksVal[ 350 ] = 327.4059  ;
  SCweeksVal[ 351 ] = 328.2797  ;
  SCweeksVal[ 352 ] = 329.1531  ;
  SCweeksVal[ 353 ] = 330.0261  ;
  SCweeksVal[ 354 ] = 330.8989  ;
  SCweeksVal[ 355 ] = 331.7713  ;
  SCweeksVal[ 356 ] = 332.6433  ;
  SCweeksVal[ 357 ] = 333.515 ;
  SCweeksVal[ 358 ] = 334.3864  ;
  SCweeksVal[ 359 ] = 335.2575  ;
  SCweeksVal[ 360 ] = 336.1282  ;
  SCweeksVal[ 361 ] = 336.9986  ;
  SCweeksVal[ 362 ] = 337.8687  ;
  SCweeksVal[ 363 ] = 338.7384  ;
  SCweeksVal[ 364 ] = 339.6077  ;
  SCweeksVal[ 365 ] = 340.4768  ;
  SCweeksVal[ 366 ] = 341.3455  ;
  SCweeksVal[ 367 ] = 342.2139  ;
  SCweeksVal[ 368 ] = 343.0819  ;
  SCweeksVal[ 369 ] = 343.9496  ;
  SCweeksVal[ 370 ] = 344.817 ;
  SCweeksVal[ 371 ] = 345.6841  ;
  SCweeksVal[ 372 ] = 346.5508  ;
  SCweeksVal[ 373 ] = 347.4172  ;
  SCweeksVal[ 374 ] = 348.2832  ;
  SCweeksVal[ 375 ] = 349.1489  ;
  SCweeksVal[ 376 ] = 350.0143  ;
  SCweeksVal[ 377 ] = 350.8793  ;
  SCweeksVal[ 378 ] = 351.7441  ;
  SCweeksVal[ 379 ] = 352.6084  ;
  SCweeksVal[ 380 ] = 353.4725  ;
  SCweeksVal[ 381 ] = 354.3362  ;
  SCweeksVal[ 382 ] = 355.1996  ;
  SCweeksVal[ 383 ] = 356.0626  ;
  SCweeksVal[ 384 ] = 356.9254  ;
  SCweeksVal[ 385 ] = 357.7877  ;
  SCweeksVal[ 386 ] = 358.6498  ;
  SCweeksVal[ 387 ] = 359.5115  ;
  SCweeksVal[ 388 ] = 360.3729  ;
  SCweeksVal[ 389 ] = 361.234 ;
  SCweeksVal[ 390 ] = 362.0947  ;
  SCweeksVal[ 391 ] = 362.9551  ;
  SCweeksVal[ 392 ] = 363.8152  ;
  SCweeksVal[ 393 ] = 364.6749  ;
  SCweeksVal[ 394 ] = 365.5343  ;
  SCweeksVal[ 395 ] = 366.3934  ;
  SCweeksVal[ 396 ] = 367.2522  ;
  SCweeksVal[ 397 ] = 368.1106  ;
  SCweeksVal[ 398 ] = 368.9687  ;
  SCweeksVal[ 399 ] = 369.8264  ;
  SCweeksVal[ 400 ] = 370.6839  ;
  SCweeksVal[ 401 ] = 371.541 ;
  SCweeksVal[ 402 ] = 372.3977  ;
  SCweeksVal[ 403 ] = 373.2542  ;
  SCweeksVal[ 404 ] = 374.1103  ;
  SCweeksVal[ 405 ] = 374.9661  ;
  SCweeksVal[ 406 ] = 375.8215  ;
  SCweeksVal[ 407 ] = 376.6767  ;
  SCweeksVal[ 408 ] = 377.5314  ;
  SCweeksVal[ 409 ] = 378.3859  ;
  SCweeksVal[ 410 ] = 379.2401  ;
  SCweeksVal[ 411 ] = 380.0939  ;
  SCweeksVal[ 412 ] = 380.9473  ;
  SCweeksVal[ 413 ] = 381.8005  ;
  SCweeksVal[ 414 ] = 382.6533  ;
  SCweeksVal[ 415 ] = 383.5058  ;
  SCweeksVal[ 416 ] = 384.358 ;
  SCweeksVal[ 417 ] = 385.2098  ;
  SCweeksVal[ 418 ] = 386.0614  ;
  SCweeksVal[ 419 ] = 386.9125  ;
  SCweeksVal[ 420 ] = 387.7634  ;
  SCweeksVal[ 421 ] = 388.6139  ;
  SCweeksVal[ 422 ] = 389.4641  ;
  SCweeksVal[ 423 ] = 390.314 ;
  SCweeksVal[ 424 ] = 391.1636  ;
  SCweeksVal[ 425 ] = 392.0128  ;
  SCweeksVal[ 426 ] = 392.8617  ;
  SCweeksVal[ 427 ] = 393.7103  ;
  SCweeksVal[ 428 ] = 394.5585  ;
  SCweeksVal[ 429 ] = 395.4064  ;
  SCweeksVal[ 430 ] = 396.254 ;
  SCweeksVal[ 431 ] = 397.1013  ;
  SCweeksVal[ 432 ] = 397.9482  ;
  SCweeksVal[ 433 ] = 398.7949  ;
  SCweeksVal[ 434 ] = 399.6412  ;
  SCweeksVal[ 435 ] = 400.4871  ;
  SCweeksVal[ 436 ] = 401.3328  ;
  SCweeksVal[ 437 ] = 402.1781  ;
  SCweeksVal[ 438 ] = 403.0231  ;
  SCweeksVal[ 439 ] = 403.8677  ;
  SCweeksVal[ 440 ] = 404.7121  ;
  SCweeksVal[ 441 ] = 405.5561  ;
  SCweeksVal[ 442 ] = 406.3998  ;
  SCweeksVal[ 443 ] = 407.2432  ;
  SCweeksVal[ 444 ] = 408.0862  ;
  SCweeksVal[ 445 ] = 408.9289  ;
  SCweeksVal[ 446 ] = 409.7713  ;
  SCweeksVal[ 447 ] = 410.6134  ;
  SCweeksVal[ 448 ] = 411.4551  ;
  SCweeksVal[ 449 ] = 412.2966  ;
  SCweeksVal[ 450 ] = 413.1377  ;
  SCweeksVal[ 451 ] = 413.9784  ;
  SCweeksVal[ 452 ] = 414.8189  ;
  SCweeksVal[ 453 ] = 415.659 ;
  SCweeksVal[ 454 ] = 416.4988  ;
  SCweeksVal[ 455 ] = 417.3383  ;
  SCweeksVal[ 456 ] = 418.1775  ;
  SCweeksVal[ 457 ] = 419.0163  ;
  SCweeksVal[ 458 ] = 419.8548  ;
  SCweeksVal[ 459 ] = 420.693 ;
  SCweeksVal[ 460 ] = 421.5309  ;
  SCweeksVal[ 461 ] = 422.3684  ;
  SCweeksVal[ 462 ] = 423.2057  ;
  SCweeksVal[ 463 ] = 424.0426  ;
  SCweeksVal[ 464 ] = 424.8792  ;
  SCweeksVal[ 465 ] = 425.7154  ;
  SCweeksVal[ 466 ] = 426.5514  ;
  SCweeksVal[ 467 ] = 427.387 ;
  SCweeksVal[ 468 ] = 428.2223  ;
  SCweeksVal[ 469 ] = 429.0573  ;
  SCweeksVal[ 470 ] = 429.8919  ;
  SCweeksVal[ 471 ] = 430.7263  ;
  SCweeksVal[ 472 ] = 431.5603  ;
  SCweeksVal[ 473 ] = 432.394 ;
  SCweeksVal[ 474 ] = 433.2273  ;
  SCweeksVal[ 475 ] = 434.0604  ;
  SCweeksVal[ 476 ] = 434.8931  ;
  SCweeksVal[ 477 ] = 435.7255  ;
  SCweeksVal[ 478 ] = 436.5576  ;
  SCweeksVal[ 479 ] = 437.3894  ;
  SCweeksVal[ 480 ] = 438.2209  ;
  SCweeksVal[ 481 ] = 439.052 ;
  SCweeksVal[ 482 ] = 439.8828  ;
  SCweeksVal[ 483 ] = 440.7133  ;
  SCweeksVal[ 484 ] = 441.5435  ;
  SCweeksVal[ 485 ] = 442.3733  ;
  SCweeksVal[ 486 ] = 443.2029  ;
  SCweeksVal[ 487 ] = 444.0321  ;
  SCweeksVal[ 488 ] = 444.861 ;
  SCweeksVal[ 489 ] = 445.6896  ;
  SCweeksVal[ 490 ] = 446.5178  ;
  SCweeksVal[ 491 ] = 447.3458  ;
  SCweeksVal[ 492 ] = 448.1734  ;
  SCweeksVal[ 493 ] = 449.0007  ;
  SCweeksVal[ 494 ] = 449.8277  ;
  SCweeksVal[ 495 ] = 450.6544  ;
  SCweeksVal[ 496 ] = 451.4807  ;
  SCweeksVal[ 497 ] = 452.3068  ;
  SCweeksVal[ 498 ] = 453.1325  ;
  SCweeksVal[ 499 ] = 453.9579  ;
  SCweeksVal[ 500 ] = 454.783 ;

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
         max: 2011
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