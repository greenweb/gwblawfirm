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
  SCweeksVal[ 101 ] = 99.7608;
  SCweeksVal[ 102 ] = 100.7172;
  SCweeksVal[ 103 ] = 101.6732;
  SCweeksVal[ 104 ] = 102.6288;
  SCweeksVal[ 105 ] = 103.5840;
  SCweeksVal[ 106 ] = 104.5387;
  SCweeksVal[ 107 ] = 105.4931;
  SCweeksVal[ 108 ] = 106.4470;
  SCweeksVal[ 109 ] = 107.4006;
  SCweeksVal[ 110 ] = 108.3537;
  SCweeksVal[ 111 ] = 109.3064;
  SCweeksVal[ 112 ] = 110.2587;
  SCweeksVal[ 113 ] = 111.2106;
  SCweeksVal[ 114 ] = 112.1620;
  SCweeksVal[ 115 ] = 113.1131;
  SCweeksVal[ 116 ] = 114.0637;
  SCweeksVal[ 117 ] = 115.0140;
  SCweeksVal[ 118 ] = 115.9638;
  SCweeksVal[ 119 ] = 116.9132;
  SCweeksVal[ 120 ] = 117.8622;
  SCweeksVal[ 121 ] = 118.8108;
  SCweeksVal[ 122 ] = 119.7590;
  SCweeksVal[ 123 ] = 120.7067;
  SCweeksVal[ 124 ] = 121.6541;
  SCweeksVal[ 125 ] = 122.6011;
  SCweeksVal[ 126 ] = 123.5476;
  SCweeksVal[ 127 ] = 124.4937;
  SCweeksVal[ 128 ] = 125.4395;
  SCweeksVal[ 129 ] = 126.3848;
  SCweeksVal[ 130 ] = 127.3297;
  SCweeksVal[ 131 ] = 128.2742;
  SCweeksVal[ 132 ] = 129.2183;
  SCweeksVal[ 133 ] = 130.1619;
  SCweeksVal[ 134 ] = 131.1052;
  SCweeksVal[ 135 ] = 132.0481;
  SCweeksVal[ 136 ] = 132.9905;
  SCweeksVal[ 137 ] = 133.9326;
  SCweeksVal[ 138 ] = 134.8742;
  SCweeksVal[ 139 ] = 135.8155;
  SCweeksVal[ 140 ] = 136.7563;
  SCweeksVal[ 141 ] = 137.6967;
  SCweeksVal[ 142 ] = 138.6367;
  SCweeksVal[ 143 ] = 139.5763;
  SCweeksVal[ 144 ] = 140.5155;
  SCweeksVal[ 145 ] = 141.4543;
  SCweeksVal[ 146 ] = 142.3927;
  SCweeksVal[ 147 ] = 143.3307;
  SCweeksVal[ 148 ] = 144.2683;
  SCweeksVal[ 149 ] = 145.2054;
  SCweeksVal[ 150 ] = 146.1422;
  SCweeksVal[ 151 ] = 147.0786;
  SCweeksVal[ 152 ] = 148.0145;
  SCweeksVal[ 153 ] = 148.9501;
  SCweeksVal[ 154 ] = 149.8852;
  SCweeksVal[ 155 ] = 150.8200;
  SCweeksVal[ 156 ] = 151.7543;
  SCweeksVal[ 157 ] = 152.6882;
  SCweeksVal[ 158 ] = 153.6218;
  SCweeksVal[ 159 ] = 154.5549;
  SCweeksVal[ 160 ] = 155.4876;
  SCweeksVal[ 161 ] = 156.4199;
  SCweeksVal[ 162 ] = 157.3518;
  SCweeksVal[ 163 ] = 158.2833;
  SCweeksVal[ 164 ] = 159.2145;
  SCweeksVal[ 165 ] = 160.1452;
  SCweeksVal[ 166 ] = 161.0755;
  SCweeksVal[ 167 ] = 162.0054;
  SCweeksVal[ 168 ] = 162.9349;
  SCweeksVal[ 169 ] = 163.8640;
  SCweeksVal[ 170 ] = 164.7927;
  SCweeksVal[ 171 ] = 165.7210;
  SCweeksVal[ 172 ] = 166.6488;
  SCweeksVal[ 173 ] = 167.5763;
  SCweeksVal[ 174 ] = 168.5034;
  SCweeksVal[ 175 ] = 169.4301;
  SCweeksVal[ 176 ] = 170.3564;
  SCweeksVal[ 177 ] = 171.2823;
  SCweeksVal[ 178 ] = 172.2078;
  SCweeksVal[ 179 ] = 173.1329;
  SCweeksVal[ 180 ] = 174.0575;
  SCweeksVal[ 181 ] = 174.9818;
  SCweeksVal[ 182 ] = 175.9057;
  SCweeksVal[ 183 ] = 176.8292;
  SCweeksVal[ 184 ] = 177.7523;
  SCweeksVal[ 185 ] = 178.6750;
  SCweeksVal[ 186 ] = 179.5973;
  SCweeksVal[ 187 ] = 180.5192;
  SCweeksVal[ 188 ] = 181.4407;
  SCweeksVal[ 189 ] = 182.3618;
  SCweeksVal[ 190 ] = 183.2824;
  SCweeksVal[ 191 ] = 184.2027;
  SCweeksVal[ 192 ] = 185.1226;
  SCweeksVal[ 193 ] = 186.0421;
  SCweeksVal[ 194 ] = 186.9612;
  SCweeksVal[ 195 ] = 187.8800;
  SCweeksVal[ 196 ] = 188.7983;
  SCweeksVal[ 197 ] = 189.7162;
  SCweeksVal[ 198 ] = 190.6337;
  SCweeksVal[ 199 ] = 191.5508;
  SCweeksVal[ 200 ] = 192.4675;
  SCweeksVal[ 201 ] = 193.3838;
  SCweeksVal[ 202 ] = 194.2998;
  SCweeksVal[ 203 ] = 195.2153;
  SCweeksVal[ 204 ] = 196.1304;
  SCweeksVal[ 205 ] = 197.0452;
  SCweeksVal[ 206 ] = 197.9595;
  SCweeksVal[ 207 ] = 198.8735;
  SCweeksVal[ 208 ] = 199.7870;
  SCweeksVal[ 209 ] = 200.7002;
  SCweeksVal[ 210 ] = 201.6130;
  SCweeksVal[ 211 ] = 202.5253;
  SCweeksVal[ 212 ] = 203.4373;
  SCweeksVal[ 213 ] = 204.3489;
  SCweeksVal[ 214 ] = 205.2601;
  SCweeksVal[ 215 ] = 206.1709;
  SCweeksVal[ 216 ] = 207.0813;
  SCweeksVal[ 217 ] = 207.9913;
  SCweeksVal[ 218 ] = 208.9009;
  SCweeksVal[ 219 ] = 209.8101;
  SCweeksVal[ 220 ] = 210.7189;
  SCweeksVal[ 221 ] = 211.6273;
  SCweeksVal[ 222 ] = 212.5354;
  SCweeksVal[ 223 ] = 213.4430;
  SCweeksVal[ 224 ] = 214.3503;
  SCweeksVal[ 225 ] = 215.2571;
  SCweeksVal[ 226 ] = 216.1636;
  SCweeksVal[ 227 ] = 217.0697;
  SCweeksVal[ 228 ] = 217.9754;
  SCweeksVal[ 229 ] = 218.8807;
  SCweeksVal[ 230 ] = 219.7856;
  SCweeksVal[ 231 ] = 220.6901;
  SCweeksVal[ 232 ] = 221.5942;
  SCweeksVal[ 233 ] = 222.4979;
  SCweeksVal[ 234 ] = 223.4012;
  SCweeksVal[ 235 ] = 224.3042;
  SCweeksVal[ 236 ] = 225.2067;
  SCweeksVal[ 237 ] = 226.1089;
  SCweeksVal[ 238 ] = 227.0107;
  SCweeksVal[ 239 ] = 227.9121;
  SCweeksVal[ 240 ] = 228.8131;
  SCweeksVal[ 241 ] = 229.7137;
  SCweeksVal[ 242 ] = 230.6139;
  SCweeksVal[ 243 ] = 231.5137;
  SCweeksVal[ 244 ] = 232.4131;
  SCweeksVal[ 245 ] = 233.3122;
  SCweeksVal[ 246 ] = 234.2108;
  SCweeksVal[ 247 ] = 235.1091;
  SCweeksVal[ 248 ] = 236.0070;
  SCweeksVal[ 249 ] = 236.9045;
  SCweeksVal[ 250 ] = 237.8016;
  SCweeksVal[ 251 ] = 238.6983;
  SCweeksVal[ 252 ] = 239.5946;
  SCweeksVal[ 253 ] = 240.4906;
  SCweeksVal[ 254 ] = 241.3861;
  SCweeksVal[ 255 ] = 242.2813;
  SCweeksVal[ 256 ] = 243.1761;
  SCweeksVal[ 257 ] = 244.0705;
  SCweeksVal[ 258 ] = 244.9645;
  SCweeksVal[ 259 ] = 245.8581;
  SCweeksVal[ 260 ] = 246.7513;
  SCweeksVal[ 261 ] = 247.6442;
  SCweeksVal[ 262 ] = 248.5366;
  SCweeksVal[ 263 ] = 249.4287;
  SCweeksVal[ 264 ] = 250.3204;
  SCweeksVal[ 265 ] = 251.2117;
  SCweeksVal[ 266 ] = 252.1026;
  SCweeksVal[ 267 ] = 252.9932;
  SCweeksVal[ 268 ] = 253.8833;
  SCweeksVal[ 269 ] = 254.7731;
  SCweeksVal[ 270 ] = 255.6624;
  SCweeksVal[ 271 ] = 256.5514;
  SCweeksVal[ 272 ] = 257.4400;
  SCweeksVal[ 273 ] = 258.3283;
  SCweeksVal[ 274 ] = 259.2161;
  SCweeksVal[ 275 ] = 260.1036;
  SCweeksVal[ 276 ] = 260.9906;
  SCweeksVal[ 277 ] = 261.8773;
  SCweeksVal[ 278 ] = 262.7636;
  SCweeksVal[ 279 ] = 263.6495;
  SCweeksVal[ 280 ] = 264.5351;
  SCweeksVal[ 281 ] = 265.4202;
  SCweeksVal[ 282 ] = 266.3050;
  SCweeksVal[ 283 ] = 267.1894;
  SCweeksVal[ 284 ] = 268.0734;
  SCweeksVal[ 285 ] = 268.9570;
  SCweeksVal[ 286 ] = 269.8403;
  SCweeksVal[ 287 ] = 270.7231;
  SCweeksVal[ 288 ] = 271.6056;
  SCweeksVal[ 289 ] = 272.4877;
  SCweeksVal[ 290 ] = 273.3694;
  SCweeksVal[ 291 ] = 274.2508;
  SCweeksVal[ 292 ] = 275.1317;
  SCweeksVal[ 293 ] = 276.0123;
  SCweeksVal[ 294 ] = 276.8925;
  SCweeksVal[ 295 ] = 277.7723;
  SCweeksVal[ 296 ] = 278.6517;
  SCweeksVal[ 297 ] = 279.5308;
  SCweeksVal[ 298 ] = 280.4094;
  SCweeksVal[ 299 ] = 281.2877;
  SCweeksVal[ 300 ] = 282.1656;
  SCweeksVal[ 301 ] = 283.0432;
  SCweeksVal[ 302 ] = 283.9203;
  SCweeksVal[ 303 ] = 284.7971;
  SCweeksVal[ 304 ] = 285.6735;
  SCweeksVal[ 305 ] = 286.5495;
  SCweeksVal[ 306 ] = 287.4251;
  SCweeksVal[ 307 ] = 288.3004;
  SCweeksVal[ 308 ] = 289.1752;
  SCweeksVal[ 309 ] = 290.0497;
  SCweeksVal[ 310 ] = 290.9239;
  SCweeksVal[ 311 ] = 291.7976;
  SCweeksVal[ 312 ] = 292.6710;
  SCweeksVal[ 313 ] = 293.5439;
  SCweeksVal[ 314 ] = 294.4166;
  SCweeksVal[ 315 ] = 295.2888;
  SCweeksVal[ 316 ] = 296.1606;
  SCweeksVal[ 317 ] = 297.0321;
  SCweeksVal[ 318 ] = 297.9032;
  SCweeksVal[ 319 ] = 298.7739;
  SCweeksVal[ 320 ] = 299.6443;
  SCweeksVal[ 321 ] = 300.5143;
  SCweeksVal[ 322 ] = 301.3839;
  SCweeksVal[ 323 ] = 302.2531;
  SCweeksVal[ 324 ] = 303.1219;
  SCweeksVal[ 325 ] = 303.9904;
  SCweeksVal[ 326 ] = 304.8585;
  SCweeksVal[ 327 ] = 305.7262;
  SCweeksVal[ 328 ] = 306.5935;
  SCweeksVal[ 329 ] = 307.4605;
  SCweeksVal[ 330 ] = 308.3271;
  SCweeksVal[ 331 ] = 309.1933;
  SCweeksVal[ 332 ] = 310.0591;
  SCweeksVal[ 333 ] = 310.9246;
  SCweeksVal[ 334 ] = 311.7897;
  SCweeksVal[ 335 ] = 312.6544;
  SCweeksVal[ 336 ] = 313.5187;
  SCweeksVal[ 337 ] = 314.3827;
  SCweeksVal[ 338 ] = 315.2463;
  SCweeksVal[ 339 ] = 316.1095;
  SCweeksVal[ 340 ] = 316.9724;
  SCweeksVal[ 341 ] = 317.8349;
  SCweeksVal[ 342 ] = 318.6970;
  SCweeksVal[ 343 ] = 319.5587;
  SCweeksVal[ 344 ] = 320.4200;
  SCweeksVal[ 345 ] = 321.2810;
  SCweeksVal[ 346 ] = 322.1416;
  SCweeksVal[ 347 ] = 323.0019;
  SCweeksVal[ 348 ] = 323.8617;
  SCweeksVal[ 349 ] = 324.7212;
  SCweeksVal[ 350 ] = 325.5804;
  SCweeksVal[ 351 ] = 326.4391;
  SCweeksVal[ 352 ] = 327.2975;
  SCweeksVal[ 353 ] = 328.1555;
  SCweeksVal[ 354 ] = 329.0131;
  SCweeksVal[ 355 ] = 329.8704;
  SCweeksVal[ 356 ] = 330.7273;
  SCweeksVal[ 357 ] = 331.5838;
  SCweeksVal[ 358 ] = 332.4400;
  SCweeksVal[ 359 ] = 333.2958;
  SCweeksVal[ 360 ] = 334.1512;
  SCweeksVal[ 361 ] = 335.0062;
  SCweeksVal[ 362 ] = 335.8609;
  SCweeksVal[ 363 ] = 336.7152;
  SCweeksVal[ 364 ] = 337.5692;
  SCweeksVal[ 365 ] = 338.4227;
  SCweeksVal[ 366 ] = 339.2759;
  SCweeksVal[ 367 ] = 340.1287;
  SCweeksVal[ 368 ] = 340.9812;
  SCweeksVal[ 369 ] = 341.8333;
  SCweeksVal[ 370 ] = 342.6850;
  SCweeksVal[ 371 ] = 343.5364;
  SCweeksVal[ 372 ] = 344.3874;
  SCweeksVal[ 373 ] = 345.2380;
  SCweeksVal[ 374 ] = 346.0882;
  SCweeksVal[ 375 ] = 346.9381;
  SCweeksVal[ 376 ] = 347.7876;
  SCweeksVal[ 377 ] = 348.6368;
  SCweeksVal[ 378 ] = 349.4856;
  SCweeksVal[ 379 ] = 350.3340;
  SCweeksVal[ 380 ] = 351.1820;
  SCweeksVal[ 381 ] = 352.0297;
  SCweeksVal[ 382 ] = 352.8770;
  SCweeksVal[ 383 ] = 353.7240;
  SCweeksVal[ 384 ] = 354.5705;
  SCweeksVal[ 385 ] = 355.4168;
  SCweeksVal[ 386 ] = 356.2626;
  SCweeksVal[ 387 ] = 357.1081;
  SCweeksVal[ 388 ] = 357.9532;
  SCweeksVal[ 389 ] = 358.7979;
  SCweeksVal[ 390 ] = 359.6423;
  SCweeksVal[ 391 ] = 360.4864;
  SCweeksVal[ 392 ] = 361.3300;
  SCweeksVal[ 393 ] = 362.1733;
  SCweeksVal[ 394 ] = 363.0162;
  SCweeksVal[ 395 ] = 363.8588;
  SCweeksVal[ 396 ] = 364.7010;
  SCweeksVal[ 397 ] = 365.5428;
  SCweeksVal[ 398 ] = 366.3843;
  SCweeksVal[ 399 ] = 367.2254;
  SCweeksVal[ 400 ] = 368.0661;
  SCweeksVal[ 401 ] = 368.9065;
  SCweeksVal[ 402 ] = 369.7465;
  SCweeksVal[ 403 ] = 370.5862;
  SCweeksVal[ 404 ] = 371.4255;
  SCweeksVal[ 405 ] = 372.2644;
  SCweeksVal[ 406 ] = 373.1029;
  SCweeksVal[ 407 ] = 373.9411;
  SCweeksVal[ 408 ] = 374.7790;
  SCweeksVal[ 409 ] = 375.6164;
  SCweeksVal[ 410 ] = 376.4536;
  SCweeksVal[ 411 ] = 377.2903;
  SCweeksVal[ 412 ] = 378.1267;
  SCweeksVal[ 413 ] = 378.9627;
  SCweeksVal[ 414 ] = 379.7984;
  SCweeksVal[ 415 ] = 380.6337;
  SCweeksVal[ 416 ] = 381.4686;
  SCweeksVal[ 417 ] = 382.3032;
  SCweeksVal[ 418 ] = 383.1374;
  SCweeksVal[ 419 ] = 383.9713;
  SCweeksVal[ 420 ] = 384.8048;
  SCweeksVal[ 421 ] = 385.6379;
  SCweeksVal[ 422 ] = 386.4707;
  SCweeksVal[ 423 ] = 387.3031;
  SCweeksVal[ 424 ] = 388.1352;
  SCweeksVal[ 425 ] = 388.9669;
  SCweeksVal[ 426 ] = 389.7982;
  SCweeksVal[ 427 ] = 390.6292;
  SCweeksVal[ 428 ] = 391.4598;
  SCweeksVal[ 429 ] = 392.2901;
  SCweeksVal[ 430 ] = 393.1200;
  SCweeksVal[ 431 ] = 393.9495;
  SCweeksVal[ 432 ] = 394.7787;
  SCweeksVal[ 433 ] = 395.6075;
  SCweeksVal[ 434 ] = 396.4360;
  SCweeksVal[ 435 ] = 397.2641;
  SCweeksVal[ 436 ] = 398.0918;
  SCweeksVal[ 437 ] = 398.9192;
  SCweeksVal[ 438 ] = 399.7463;
  SCweeksVal[ 439 ] = 400.5729;
  SCweeksVal[ 440 ] = 401.3993;
  SCweeksVal[ 441 ] = 402.2252;
  SCweeksVal[ 442 ] = 403.0508;
  SCweeksVal[ 443 ] = 403.8761;
  SCweeksVal[ 444 ] = 404.7009;
  SCweeksVal[ 445 ] = 405.5255;
  SCweeksVal[ 446 ] = 406.3497;
  SCweeksVal[ 447 ] = 407.1735;
  SCweeksVal[ 448 ] = 407.9969;
  SCweeksVal[ 449 ] = 408.8200;
  SCweeksVal[ 450 ] = 409.6428;
  SCweeksVal[ 451 ] = 410.4652;
  SCweeksVal[ 452 ] = 411.2872;
  SCweeksVal[ 453 ] = 412.1089;
  SCweeksVal[ 454 ] = 412.9302;
  SCweeksVal[ 455 ] = 413.7512;
  SCweeksVal[ 456 ] = 414.5718;
  SCweeksVal[ 457 ] = 415.3921;
  SCweeksVal[ 458 ] = 416.2120;
  SCweeksVal[ 459 ] = 417.0316;
  SCweeksVal[ 460 ] = 417.8508;
  SCweeksVal[ 461 ] = 418.6696;
  SCweeksVal[ 462 ] = 419.4881;
  SCweeksVal[ 463 ] = 420.3062;
  SCweeksVal[ 464 ] = 421.1240;
  SCweeksVal[ 465 ] = 421.9414;
  SCweeksVal[ 466 ] = 422.7585;
  SCweeksVal[ 467 ] = 423.5752;
  SCweeksVal[ 468 ] = 424.3916;
  SCweeksVal[ 469 ] = 425.2076;
  SCweeksVal[ 470 ] = 426.0233;
  SCweeksVal[ 471 ] = 426.8386;
  SCweeksVal[ 472 ] = 427.6536;
  SCweeksVal[ 473 ] = 428.4682;
  SCweeksVal[ 474 ] = 429.2824;
  SCweeksVal[ 475 ] = 430.0963;
  SCweeksVal[ 476 ] = 430.9099;
  SCweeksVal[ 477 ] = 431.7231;
  SCweeksVal[ 478 ] = 432.5359;
  SCweeksVal[ 479 ] = 433.3484;
  SCweeksVal[ 480 ] = 434.1605;
  SCweeksVal[ 481 ] = 434.9723;
  SCweeksVal[ 482 ] = 435.7838;
  SCweeksVal[ 483 ] = 436.5949;
  SCweeksVal[ 484 ] = 437.4056;
  SCweeksVal[ 485 ] = 438.2160;
  SCweeksVal[ 486 ] = 439.0260;
  SCweeksVal[ 487 ] = 439.8357;
  SCweeksVal[ 488 ] = 440.6450;
  SCweeksVal[ 489 ] = 441.4540;
  SCweeksVal[ 490 ] = 442.2627;
  SCweeksVal[ 491 ] = 443.0710;
  SCweeksVal[ 492 ] = 443.8789;
  SCweeksVal[ 493 ] = 444.6865;
  SCweeksVal[ 494 ] = 445.4937;
  SCweeksVal[ 495 ] = 446.3006;
  SCweeksVal[ 496 ] = 447.1071;
  SCweeksVal[ 497 ] = 447.9133;
  SCweeksVal[ 498 ] = 448.7192;
  SCweeksVal[ 499 ] = 449.5247;
  SCweeksVal[ 500 ] = 450.3298;

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
          if(aww > 1149.01)
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