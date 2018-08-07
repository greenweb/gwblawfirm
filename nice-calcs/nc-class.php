<?php

/**
*
*/
class Nice_Calculator {

  private static $instance = null;

  public static function get_instance() {
    if ( ! isset( self::$instance ) )
      self::$instance = new self;
    return self::$instance;
  }

  private function __construct() {
    add_shortcode( 'calculator', array( $this, 'calculators_func' ) );
    add_action( 'wp_enqueue_scripts', array(  $this, 'nc_enqueue_scripts')  );
    add_action ('wp_enqueue_scripts', array(  $this, 'nc_load_scripts')     );
  }

  public function calculators_func( $atts ) {
    extract( shortcode_atts( array(
        'type' => null
    ), $atts ) );
    $result = null;

    if( $type == 'N' ) {
      $result = self::get_north_forms();
    }

    if( $type == 'SC' ) {
      $result = self::get_south_forms();
    }

    if( $type == 'PVC' ) {
      $result = self::get_pvc_form();
    }

    if( $type == 'NPDD' ) {
      $result = self::get_north_ppd_forms();
    }

    if( $type == 'SCPDD' ) {
      $result = self::get_south_ppd_forms();
    }

    return '<div class="calc-forms">'.$result.'</div>';
  }

  public function get_north_forms() {
    return '
    <div class="cf-row">
        <form id="weeks_calculator">
          <fieldset>
            <legend>Number of Weeks Calculator</legend>
            <ol>
              <li>
                <label for="from">Start Date:</label> <input type="text" placeholder="MM/DD/YY" class="datepicker" id="from" name="from">
              </li>
              <li>
                <label for="to">End Date:</label> <input type="text" placeholder="MM/DD/YY" class="datepicker" id="to" name="to" >
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="weeksLabel">Weeks: </label> <span id="weeks" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>

        <form id="nc_commuted_value_calculator">
          <input type="hidden" name="paymentType" id="remaining" value="0">
          <fieldset>
            <legend>Commuted Value Calculator</legend>
            <ol>
              <li>
                <label for="numWeeks">Number of Weeks:</label> <input type="text" id="numWeeks" name="numWeeks">
              </li>
              <li>
                <label for="payments">Weekly Payment ($):</label> <input type="text" id="payments" name="payments">
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="presentValueLabel">Commuted Value Amount ($): </label> <span id="presentValue" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>
    </div>
    <div class="cf-row">
        <form id="nc_life_expectancy_calculator">
          <fieldset>
            <legend>Life Expectancy Calculator</legend>
            <ol>
              <li>
                <label for="age">Age:</label>
                <select id="age">
                  <option value="75.8">  0   </option>
                  <option value="75.4">  1   </option>
                  <option value="74.5">  2   </option>

                  <option value="73.5">  3   </option>
                  <option value="72.5">  4   </option>
                  <option value="71.6">  5   </option>
                  <option value="70.6">  6   </option>
                  <option value="69.6">  7   </option>

                  <option value="68.6">  8   </option>
                  <option value="67.6">  9   </option>
                  <option value="66.6">  10  </option>
                  <option value="65.6">  11  </option>
                  <option value="64.6">  12  </option>

                  <option value="63.7">  13  </option>
                  <option value="62.7">  14  </option>
                  <option value="61.7">  15  </option>
                  <option value="60.7">  16  </option>
                  <option value="59.8">  17  </option>

                  <option value="58.8">  18  </option>
                  <option value="57.9">  19  </option>
                  <option value="56.9">  20  </option>
                  <option value="56">    21  </option>
                  <option value="55.1">  22  </option>

                  <option value="54.1">  23  </option>
                  <option value="53.2">  24  </option>
                  <option value="52.2">  25  </option>
                  <option value="51.3">  26  </option>
                  <option value="50.4">  27  </option>

                  <option value="49.4">  28  </option>
                  <option value="48.5">  29  </option>
                  <option value="47.5">  30  </option>
                  <option value="46.6">  31  </option>
                  <option value="45.7">  32  </option>

                  <option value="44.7">  33  </option>
                  <option value="43.8">  34  </option>
                  <option value="42.9">  35  </option>
                  <option value="42">    36  </option>
                  <option value="41">    37  </option>

                  <option value="40.1">  38  </option>
                  <option value="39.2">  39  </option>
                  <option value="38.3">  40  </option>
                  <option value="37.4">  41  </option>
                  <option value="36.5">  42  </option>

                  <option value="35.6">  43  </option>
                  <option value="34.7">  44  </option>
                  <option value="33.8">  45  </option>
                  <option value="32.9">  46  </option>
                  <option value="32">    47  </option>

                  <option value="31.1">  48  </option>
                  <option value="30.2">  49  </option>
                  <option value="29.3">  50  </option>
                  <option value="28.5">  51  </option>
                  <option value="27.6">  52  </option>

                  <option value="26.8">  53  </option>
                  <option value="25.9">  54  </option>
                  <option value="25.1">  55  </option>
                  <option value="24.3">  56  </option>
                  <option value="23.5">  57  </option>

                  <option value="22.7">  58  </option>
                  <option value="21.9">  59  </option>
                  <option value="21.1">  60  </option>
                  <option value="20.4">  61  </option>
                  <option value="19.7">  62  </option>

                  <option value="18.9">  63  </option>
                  <option value="18.2">  64  </option>
                  <option value="17.5">  65  </option>
                  <option value="16.8">  66  </option>
                  <option value="16.1">  67  </option>

                  <option value="15.5">  68  </option>
                  <option value="14.8">  69  </option>
                  <option value="14.2">  70  </option>
                  <option value="13.5">  71  </option>
                  <option value="12.9">  72  </option>

                  <option value="12.3">  73  </option>
                  <option value="11.7">  74  </option>
                  <option value="11.2">  75  </option>
                  <option value="10.6">  76  </option>
                  <option value="10">    77  </option>

                  <option value="9.5">   78  </option>
                  <option value="9">     79  </option>
                  <option value="8.5">   80  </option>
                  <option value="8">     81  </option>
                  <option value="7.5">   82  </option>

                  <option value="7.1">   83  </option>
                  <option value="6.6">   84  </option>
                  <option value="6.6">   85 and over </option>
                </select>
              </li>
              <li>
                <label id="lifeExpectancyLabel">Life Expectancy: </label> <span id="lifeExpectancy" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>
        <form id="nc_compensation_rate_calculator">
          <fieldset>
            <legend>Compensation Rate Calculator</legend>
            <ol>
              <li>
                <label for="NCaww">Avg. Weekly Wage:</label> <input type="text" id="NCaww" name="NCaww">
              </li>
              <li>
                <label for="year">Year:</label>
                <select id="NCyear">
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                </select>
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="NCcrcLabel">Compensation Rate ($): </label> <span id="NCcrc" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>
    </div>
    ';
  }

  public function get_south_forms() {
    return '<div class="cf-row">
        <form id="weeks_calculator">
          <fieldset>
            <legend>Number of Weeks Calculator</legend>
            <ol>
              <li>
                <label for="from">Start Date:</label> <input type="text" placeholder="MM/DD/YY" class="datepicker" id="from" name="from">
              </li>
              <li>
                <label for="to">End Date:</label> <input type="text" placeholder="MM/DD/YY" class="datepicker" id="to" name="to" >
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="weeksLabel">Weeks: </label>
                <span id="weeks" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>

        <form id="sc_commuted_value_calculator">
          <fieldset>
            <legend>Commuted Value Calculator</legend>
            <input type="hidden" name="paymentType" id="remaining" value="0">
            <ol>

              <li>
                <label for="numWeeks">Weeks Remaining:</label> <input type="text" name="numWeeks" id="numWeeks">
              </li>
              <li>
                <label for="payments">Weekly Payment ($):</label> <input type="text" name="payments" id="payments">
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="presentValueLabel">Commuted Value Amount ($): </label>
                <span id="presentValue" class="cf-result"></span>
              </li>
            </ol>
            <small>Current SCWCC Discount Rate is 2%</small>
          </fieldset>
        </form>
      </div>

      <div class="cf-row">
        <form id="sc_compensation_rate_calculator" style="float:none;">
          <fieldset>
            <legend>Compensation Rate Calculator</legend>
            <ol>
              <li>
                <label for="aww">Avg. Weekly Wage:</label> <input type="text" name="aww" id="aww">
              </li>
              <li>
                <label for="year">Year:</label>
                <select id="year">
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                </select>
              </li>
              <li>
                 <input type="submit" value="Calculate">
              </li>
              <li>
                <label id="crcLabel">Compensation Rate ($): </label>
                <span id="crc" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>
        <form id="sc_life_expectancy_calculator">
          <fieldset>
            <legend>Life Expectancy Calculator</legend>
            <ol>
              <li>
               <label for="gender">Gender:</label>
                <select id="gender">
                  <option selected> </option>
                  <option value="female">female</option>
                  <option value="male">male</option>
                </select>
              </li>
              <li id="f_options" style="display:none;">
                <label for="f-age">Age:</label>
                <select id="f-age">
                  <option value="80.84">0</option>
                  <option value="79.88">1</option>
                  <option value="78.91">2</option>
                  <option value="77.93">3</option>
                  <option value="76.95">4</option>
                  <option value="75.96">5</option>
                  <option value="74.97">6</option>
                  <option value="73.99">7</option>
                  <option value="73.00">8</option>
                  <option value="72.02">9</option>
                  <option value="71.03">10</option>
                  <option value="70.05">11</option>
                  <option value="69.07">12</option>
                  <option value="68.08">13</option>
                  <option value="67.10">14</option>
                  <option value="66.13">15</option>
                  <option value="65.15">16</option>
                  <option value="64.17">17</option>
                  <option value="63.20">18</option>
                  <option value="62.23">19</option>
                  <option value="61.26">20</option>
                  <option value="60.28">21</option>
                  <option value="59.31">22</option>
                  <option value="58.34">23</option>
                  <option value="57.37">24</option>
                  <option value="56.40">25</option>
                  <option value="55.43">26</option>
                  <option value="54.46">27</option>
                  <option value="53.49">28</option>
                  <option value="52.53">29</option>
                  <option value="51.56">30</option>
                  <option value="50.60">31</option>
                  <option value="49.63">32</option>
                  <option value="48.67">33</option>
                  <option value="47.71">34</option>
                  <option value="46.75">35</option>
                  <option value="45.80">36</option>
                  <option value="44.84">37</option>
                  <option value="43.89">38</option>
                  <option value="42.94">39</option>
                  <option value="42.00">40</option>
                  <option value="41.05">41</option>
                  <option value="40.11">42</option>
                  <option value="39.17">43</option>
                  <option value="38.23">44</option>
                  <option value="37.29">45</option>
                  <option value="36.36">46</option>
                  <option value="35.43">47</option>
                  <option value="34.51">48</option>
                  <option value="33.60">49</option>
                  <option value="32.69">50</option>
                  <option value="31.79">51</option>
                  <option value="30.90">52</option>
                  <option value="30.01">53</option>
                  <option value="29.14">54</option>
                  <option value="28.27">55</option>
                  <option value="27.41">56</option>
                  <option value="26.57">57</option>
                  <option value="25.73">58</option>
                  <option value="24.90">59</option>
                  <option value="24.08">60</option>
                  <option value="23.27">61</option>
                  <option value="22.47">62</option>
                  <option value="21.68">63</option>
                  <option value="20.90">64</option>
                  <option value="20.12">65</option>
                  <option value="19.36">66</option>
                  <option value="18.60">67</option>
                  <option value="17.86">68</option>
                  <option value="17.12">69</option>
                  <option value="16.40">70</option>
                  <option value="15.69">71</option>
                  <option value="14.99">72</option>
                  <option value="14.31">73</option>
                  <option value="13.64">74</option>
                  <option value="12.98">75</option>
                  <option value="12.34">76</option>
                  <option value="11.71">77</option>
                  <option value="11.10">78</option>
                  <option value="10.50">79</option>
                  <option value="9.92">80</option>
                  <option value="9.35">81</option>
                  <option value="8.81">82</option>
                  <option value="8.29">83</option>
                  <option value="7.79">84</option>
                  <option value="7.32">85</option>
                  <option value="6.87">86</option>
                  <option value="6.43">87</option>
                  <option value="6.02">88</option>
                  <option value="5.64">89</option>
                  <option value="5.29">90</option>
                  <option value="4.96">91</option>
                  <option value="4.61">92</option>
                  <option value="4.26">93</option>
                  <option value="3.93">94</option>
                  <option value="3.63">95</option>
                  <option value="3.38">96</option>
                  <option value="3.18">97</option>
                  <option value="3.02">98</option>
                  <option value="2.82">99</option>
                  <option value="2.61">100</option>
                  <option value="2.42">101</option>
                  <option value="2.23">102</option>
                  <option value="2.06">103</option>
                  <option value="1.89">104</option>
                  <option value="1.74">105</option>
                  <option value="1.60">106</option>
                  <option value="1.47">107</option>
                  <option value="1.36">108</option>
                  <option value="1.25">109</option>
                  <option value="1.16">110</option>
                  <option value="1.08">111</option>
                  <option value="1.00">112</option>
                  <option value="0.93">113</option>
                  <option value="0.86">114</option>
                  <option value="0.79">115</option>
                  <option value="0.73">116</option>
                  <option value="0.67">117</option>
                  <option value="0.61">118</option>
                  <option value="0.56">119</option>
                  <option value="0.50">120</option>
                </select>
              </li>
              <li id="m_options" style="display:none;">
                <label for="m-age">Age:</label>
                <select id="m-age">
                  <option value="76.62">0</option>
                  <option value="75.69">1</option>
                  <option value="74.74">2</option>
                  <option value="73.76">3</option>
                  <option value="72.78">4</option>
                  <option value="71.80">5</option>
                  <option value="70.81">6</option>
                  <option value="69.83">7</option>
                  <option value="68.84">8</option>
                  <option value="67.86">9</option>
                  <option value="66.88">10</option>
                  <option value="65.89">11</option>
                  <option value="64.91">12</option>
                  <option value="63.93">13</option>
                  <option value="62.95">14</option>
                  <option value="61.98">15</option>
                  <option value="61.02">16</option>
                  <option value="60.07">17</option>
                  <option value="59.12">18</option>
                  <option value="58.17">19</option>
                  <option value="57.23">20</option>
                  <option value="56.29">21</option>
                  <option value="55.34">22</option>
                  <option value="54.40">23</option>
                  <option value="53.45">24</option>
                  <option value="52.51">25</option>
                  <option value="51.57">26</option>
                  <option value="50.62">27</option>
                  <option value="49.68">28</option>
                  <option value="48.74">29</option>
                  <option value="47.79">30</option>
                  <option value="46.85">31</option>
                  <option value="45.90">32</option>
                  <option value="44.95">33</option>
                  <option value="44.00">34</option>
                  <option value="43.05">35</option>
                  <option value="42.11">36</option>
                  <option value="41.16">37</option>
                  <option value="40.21">38</option>
                  <option value="39.27">39</option>
                  <option value="38.33">40</option>
                  <option value="37.39">41</option>
                  <option value="36.46">42</option>
                  <option value="35.53">43</option>
                  <option value="34.61">44</option>
                  <option value="33.69">45</option>
                  <option value="32.78">46</option>
                  <option value="31.87">47</option>
                  <option value="30.97">48</option>
                  <option value="30.07">49</option>
                  <option value="29.18">50</option>
                  <option value="28.28">51</option>
                  <option value="27.40">52</option>
                  <option value="26.52">53</option>
                  <option value="25.65">54</option>
                  <option value="24.79">55</option>
                  <option value="23.94">56</option>
                  <option value="23.10">57</option>
                  <option value="22.27">58</option>
                  <option value="21.45">59</option>
                  <option value="20.64">60</option>
                  <option value="19.85">61</option>
                  <option value="19.06">62</option>
                  <option value="18.29">63</option>
                  <option value="17.54">64</option>
                  <option value="16.80">65</option>
                  <option value="16.08">66</option>
                  <option value="15.37">67</option>
                  <option value="14.68">68</option>
                  <option value="13.99">69</option>
                  <option value="13.32">70</option>
                  <option value="12.66">71</option>
                  <option value="12.01">72</option>
                  <option value="11.39">73</option>
                  <option value="10.78">74</option>
                  <option value="10.18">75</option>
                  <option value="9.61">76</option>
                  <option value="9.05">77</option>
                  <option value="8.50">78</option>
                  <option value="7.98">79</option>
                  <option value="7.49">80</option>
                  <option value="7.01">81</option>
                  <option value="6.57">82</option>
                  <option value="6.14">83</option>
                  <option value="5.74">84</option>
                  <option value="5.36">85</option>
                  <option value="5.00">86</option>
                  <option value="4.66">87</option>
                  <option value="4.35">88</option>
                  <option value="4.07">89</option>
                  <option value="3.81">90</option>
                  <option value="3.57">91</option>
                  <option value="3.35">92</option>
                  <option value="3.15">93</option>
                  <option value="2.96">94</option>
                  <option value="2.78">95</option>
                  <option value="2.62">96</option>
                  <option value="2.47">97</option>
                  <option value="2.32">98</option>
                  <option value="2.19">99</option>
                  <option value="2.07">100</option>
                  <option value="1.96">101</option>
                  <option value="1.86">102</option>
                  <option value="1.76">103</option>
                  <option value="1.66">104</option>
                  <option value="1.57">105</option>
                  <option value="1.48">106</option>
                  <option value="1.39">107</option>
                  <option value="1.30">108</option>
                  <option value="1.22">109</option>
                  <option value="1.14">110</option>
                  <option value="1.07">111</option>
                  <option value="0.99">112</option>
                  <option value="0.92">113</option>
                  <option value="0.85">114</option>
                  <option value="0.79">115</option>
                  <option value="0.72">116</option>
                  <option value="0.66">117</option>
                  <option value="0.61">118</option>
                  <option value="0.55">119</option>
                  <option value="0.50">120</option>
                </select>
              </li>
              <li>
                <label id="lifeExpectancyLabel">Life Expectancy: </label> <span id="lifeExpectancy" class="cf-result"></span>
              </li>
            </ol>
          </fieldset>
        </form>
      </div>';
  }

  public function get_south_ppd_forms() {
    $html ='
      <div class="cf-row">
        <form id="sc_ppd" novalidate="novalidate">
          <fieldset>
            <legend>PPD Calculator</legend>
            <ol>
              <li class="hiddenLabel" id="bodypartLabel"></li>
              <li>
                <label for="compRate">Compensation Rate:</label> <input type="text" name="compRate" id="compRate">
              </li>
              <li>
                <label for="rating">Impairment Rating:</label> <input type="text" name="rating" id="rating">
              </li>
              <li>
                <label id="ppdLabel">PPD ($): </label>
                <span id="ppd" class="cf-result"></span>
              </li>
            </ol>
            <img src="' . plugins_url('images/body-parts-sc-outline.png', __FILE__) .'" alt=" " usemap="#body_parts" id="body_parts"  >
              <map name="body_parts">
                <area data-comp="140" shape="poly" coords="650,35,740,35,736,239,650,239" href="#" class="foot">
                <area data-comp="140" shape="rect" coords="590,243,691,267" href="#" class="foot">

                <area data-comp="35" shape="poly" coords="593,33,604,33,610,43,613,61,608,69,600,69,590,64,587,53,586,40" href="#" class="big-toe">
                <area data-comp="35" shape="rect" coords="591,7,711,26" href="#" class="big-toe">

                <area data-comp="10" shape="poly" coords="543,104,532,87,540,72,560,48,581,35,585,49,587,63,566,75,555,88" href="#" class="other-toes">
                <area data-comp="10" shape="rect" coords="446,27,569,43" href="#" class="other-toes">

                <area data-comp="65" shape="rect" coords="7,502,112,523" href="#" class="thumb">
                <area data-comp="65" shape="poly" coords="52,425,60,414,80,416,97,430,107,439,107,485" href="#" class="thumb">

                <area data-comp="40" shape="rect" coords="7,296,124,316" href="#" class="1st-finger">
                <area data-comp="40" shape="poly" coords="109,327,120,328,130,403,109,434,97,366,101,333" href="#" class="1st-finger">

                <area data-comp="35" shape="rect" coords="141,299,272,315" href="#" class="2nd-finger">
                <area data-comp="35" shape="poly" coords="136,325,146,319,154,324,156,403,133,403,134,342" href="#" class="2nd-finger">

                <area data-comp="25" shape="rect" coords="187,319,313,334" href="#" class="3rd-finger">
                <area data-comp="25" shape="poly" coords="168,333,176,330,183,334,185,366,184,384,176,414,158,403,162,382,166,350" href="#" class="3rd-finger">

                <area data-comp="20" shape="rect" coords="206,339,331,356" href="#" class="4th-finger">
                <area data-comp="20" shape="poly" coords="196,424,175,415,186,399,194,380,198,363,201,356,214,358,216,370,206,408" href="#" class="4th-finger">

                <area data-comp="220" shape="rect" coords="237,392,335,418" href="#" class="arm">
                <area data-comp="220" shape="poly" coords="341,437,354,440,356,431,356,421,364,401,367,384,362,356,354,363,353,379,352,392,348,416,337,425,338,431" href="#" class="arm">


                <area data-comp="280" shape="rect" coords="242,418,335,439" href="#" class="hip">
                <area data-comp="280" shape="poly" coords="364,411,382,411,381,430,364,422" href="#"  class="hip">

                <area data-comp="195" shape="rect" coords="241,443,334,465" href="#" class="leg">
                <area data-comp="195" shape="poly" coords="364,422,383,431,374,470,364,506,364,517,349,525,344,524,342,518,352,513,356,504,358,471,360,463" href="#" class="leg">

                <area data-comp="500" shape="rect" coords="452,379,597,403" href="#" class="back">
                <area data-comp="500" shape="rect" coords="615,349,657,415" href="#" class="back">

                <area data-comp="300" shape="rect" coords="453,354,601,376" href="#"  class="back-a">
                <area data-comp="300" shape="rect" coords="615,349,657,415" href="#" class="back-a">

                <area data-comp="165" shape="rect" coords="8,150,300,171" href="#" class="ear-both">
                <area data-comp="165" shape="rect" coords="445,117,462,166" href="#" class="ear-both">
                <area data-comp="80" shape="rect" coords="303,117,319,166" href="#" class="ear">
                <area data-comp="165" shape="rect" coords="303,117,319,166" href="#" class="ear-both">
                <area data-comp="80" shape="rect" coords="7,131,300,150" href="#" class="ear">

                <area data-comp="140" shape="rect" coords="335,129,372,146" href="#" class="one-eye">
                <area data-comp="140" shape="rect" coords="8,109,300,129" href="#" class="one-eye">

                <area data-comp="180" shape="poly" coords="407,421,418,415,429,429,422,440,413,441,407,436" href="#" class="hand">
                <area data-comp="180" shape="rect" coords="431,416,534,439" href="#" class="hand">

                <area data-comp="300" shape="rect" coords="413,327,544,345" href="#"  class="shoulder">
                <area data-comp="300" shape="poly" coords="385,349,385,383,412,384,411,359,400,352" href="#"  class="shoulder">
              </map>
            </fieldset>
          </form>
        </div>';
        return $html;
  }

  public function get_north_ppd_forms() {
    $html ='
      <div class="cf-row">
        <form id="nc_ppd" novalidate="novalidate">
          <fieldset>
            <legend>PPD Calculator</legend>
            <ol>
              <li class="hiddenLabel" id="bodypartLabel"></li>
              <li>
                <label for="compRate">Compensation Rate:</label> <input type="text" name="compRate" id="compRate">
              </li>
              <li>
                <label for="rating">Impairment Rating:</label> <input type="text" name="rating" id="rating">
              </li>
              <li>
                <label id="ppdLabel">PPD ($): </label>
                <span id="ppd" class="cf-result"></span>
              </li>
            </ol>
            <img src="' . plugins_url('images/body-parts-outline.png', __FILE__) .'" alt=" " usemap="#body_parts" id="body_parts"  >
              <map name="body_parts">
                <area shape="poly" coords="650,35,740,35,736,239,650,239" href="#" class="foot" data-comp="144" >
                <area shape="rect" coords="590,243,691,267" href="#" class="foot" data-comp="144" >

                <area shape="poly" coords="593,33,604,33,610,43,613,61,608,69,600,69,590,64,587,53,586,40" href="#" class="big-toe" data-comp="35" >
                <area shape="rect" coords="591,7,711,26" href="#" class="big-toe" data-comp="35" >

                <area shape="poly" coords="543,104,532,87,540,72,560,48,581,35,585,49,587,63,566,75,555,88" href="#" class="other-toes" data-comp="10" >
                <area shape="rect" coords="446,27,569,43" href="#" class="other-toes" data-comp="10" >

                <area shape="rect" coords="7,502,112,523" href="#" class="thumb" data-comp="75" >
                <area shape="poly" coords="52,425,60,414,80,416,97,430,107,439,107,485" href="#" class="thumb" data-comp="75" >

                <area shape="rect" coords="7,296,124,316" href="#" class="1st-finger" data-comp="45" >
                <area shape="poly" coords="109,327,120,328,130,403,109,434,97,366,101,333" href="#" class="1st-finger" data-comp="45" >

                <area shape="rect" coords="141,299,272,315" href="#" class="2nd-finger" data-comp="40" >
                <area shape="poly" coords="136,325,146,319,154,324,156,403,133,403,134,342" href="#" class="2nd-finger" data-comp="40" >

                <area shape="rect" coords="187,319,313,334" href="#" class="3rd-finger" data-comp="25" >
                <area shape="poly" coords="168,333,176,330,183,334,185,366,184,384,176,414,158,403,162,382,166,350" href="#" class="3rd-finger" data-comp="25" >

                <area shape="rect" coords="206,339,331,356" href="#" class="4th-finger" data-comp="20" >
                <area shape="poly" coords="196,424,175,415,186,399,194,380,198,363,201,356,214,358,216,370,206,408" href="#" class="4th-finger" data-comp="20" >

                <area shape="rect" coords="237,392,332,417" href="#" class="arm" data-comp="240" >
                <area shape="poly" coords="341,437,354,440,356,431,356,421,364,401,367,384,362,356,354,363,353,379,352,392,348,416,337,425,338,431" href="#" class="arm" data-comp="240" >

                <area shape="rect" coords="241,443,334,465" href="#" class="leg" data-comp="200" >
                <area shape="poly" coords="364,422,383,431,374,470,364,506,364,517,349,525,344,524,342,518,352,513,356,504,358,471,360,463" href="#" class="leg" data-comp="200" >

                <area shape="rect" coords="492,375,592,396" href="#" class="back" data-comp="300" >
                <area shape="rect" coords="615,349,657,415" href="#" class="back" data-comp="300" >

                <area shape="rect" coords="8,150,300,171" href="#" class="ear-both" data-comp="150" >
                <area shape="rect" coords="445,117,462,166" href="#" class="ear-both" data-comp="150" >
                <area shape="rect" coords="303,117,319,166" href="#" class="ear" data-comp="70" >
                <area shape="rect" coords="303,117,319,166" href="#" class="ear-both" data-comp="150" >
                <area shape="rect" coords="7,131,300,150" href="#" class="ear" data-comp="70" >

                <area shape="rect" coords="335,129,372,146" href="#" class="one-eye" data-comp="120" >
                <area shape="rect" coords="8,109,300,129" href="#" class="one-eye" data-comp="120" >

                <area shape="poly" coords="407,421,418,415,429,429,422,440,413,441,407,436" href="#" class="hand" data-comp="200" >
                <area shape="rect" coords="431,416,534,439" href="#" class="hand" data-comp="200" >
              </map>
            </fieldset>
          </form>
        </div>';
    return $html;
  }

  public function get_pvc_form() {
    $html = '<div class="cf-row">
              <form id="pvc" class="single">
                <fieldset>
                  <legend>Present Value Calculator</legend>
                  <ol>
                    <li><em>Present day value for lifetime benefits.</em></li>
                    <li>
                      <label for="payment">Weekly Payment:</label>
                      <input type="text" id="payment" name="payment" required>
                    </li>
                    <li>
                      <label for="weeks">Weeks:</label>
                      <input type="text" id="weeks" name="weeks" required>
                    </li>
                    <li>
                      <label for="rate">Interest Rate (%):</label>
                      <input type="text" class="input-small" id="rate" name="rate" required>
                    </li>
                    <li>
                       <input type="submit" value="Calculate">
                    </li>
                  </ol>
                </fieldset>
              </form>
              <div id="pvc_result" class="pvc_results">
              </div>
            </div>';
    return $html;
  }

  public function nc_enqueue_scripts() {
    /**
     * This function is provided for demonstration purposes only.
     *
     * An instance of this class should be passed to the run() function
     * defined in Display_Code_And_Shortcodes_Loader as all of the hooks are defined
     * in that particular class.
     *
     * The Display_Code_And_Shortcodes_Loader will then create the relationship
     * between the defined hooks and the functions defined in this
     * class.
    */
    wp_register_style("jquery-style", plugins_url("css/jquery-ui.css", __FILE__), '1', 'all');
    wp_register_style("nc-santiago-datepicker", plugins_url("css/santiago.datepicker.css", __FILE__), '1', 'all');
    wp_register_script( 'jquery-validate', plugins_url("js/jquery.validate.js", __FILE__), array('jquery'), '1.14', true );
    wp_register_script("jquery-imagemapster", plugins_url("js/jquery.imagemapster.js", __FILE__), array('jquery'), '1.2.14-beta1');
    wp_register_script("nc-datepicker", plugins_url("js/nc-form-functions.js", __FILE__), array('jquery-ui-datepicker','jquery-validate','jquery-imagemapster'), '1');
  }

  public function nc_load_scripts() {
    global $post;
    $content = $post->post_content;
    if ( FALSE !== strpos( $content, '[calculator' ) || is_page('2644' ) || is_page('2636' )  ) {
      wp_enqueue_style('jquery-style');
      wp_enqueue_style('nc-santiago-datepicker');
      wp_enqueue_script('nc-datepicker');
    }
  }

}