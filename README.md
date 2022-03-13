# BernardBrethrenBrowseBourses

Team Members: Shilpa Sweth, Veda Sree Bojanapally, Ritvika Pillai, Samuel Jayachandran

## 1 - Description of the dataset
This dataset is collated using information present in the Annual Social and Economic Supplement (ASEC) which is a part of the Current Population Survey (CPS). It sources up-to-date, periodically-organized, official, national estimates of the following socioeconomic factors: poverty levels and rates of widely used measures of income. These data are obtained from the microdata files from the Current Population Survey (CPS) consisting of data concerning: families, household composition, educational attainment, income sources, poverty, health insurance coverage, geographic mobility. We have three tables: family, person and household, where person and family have been mapped to the household data with respect to their keys.
Questions highlighting the social and economic characteristics of every person who is a member of the household as of date of the interview have been asked in the survey. The questions related to income take into consideration the income that has been received in the previous year. The information acquired by measuring factors like family income and number of people in that particular household helps in indicating the poverty status.

## 2 - Users identification
### Public Affairs Research Analyst -
1) Background - A public affairs research analyst may work for government agencies, think tanks, and other organizations focused on areas such as defense, health care, energy, or environmental protection. A person in this role applies political, economic, and scientific research techniques to determine the benefits and drawbacks of current and proposed public policies. They advise legislators, government leaders, and industry executives on policymatters. They collect and analyze information to draw meaningful insights for presentation to decision-makers.
2) Motivations - To provide visualization aid in the form of a year-end report to the higher officials.
3) Tasks - To draw insightful conclusions from the data and provide in-depth analysis on government policies. Also, to get a comprehensive view of the pulse of the households in a particular region.
4) Context of use - After performing an exploratory analysis on the data, the user will then determine which snapshots of information they wish to present as a sequential data story.
5) Challenges - The analyst would be constrained in conveying insights from their exploratory analysis by only using a concise report.

### A worker being transferred to US as part of their job - 
1) Background - An individual who’s recently shifting to the United States and wants to compare the housing rates, taxes, safety, etc of various regions.
2) Motivations - To find the best possible housing options (according to his needs) that are not only within his budget but also sound from a safety point of view.
3) Tasks - To extract variations in the housing prices across different regions over the years. Also, to study the various factors that might influence the individual in buying a house in that region.
4) Context of use - After studying the visualizations, the individual decides whether they would consider moving to that region. This visualization would help them in deciding without having to spend a lot of time researching ideal housing options on several websites.
5) Challenges - Might be a bit difficult for the individual to initially draw understanding from the visualizations as he/they might not be very familiar with data visualizations.

### Real Estate Analyst
1) Background - A Real estate analyst would manage the real estate investments of organizations. A person in this role would monitor the changes in the market and decide whether to buy or sell in a particular region.
2) Motivations - To maximize the profit by investing in a property with a prospect of attracting more buyers.
3) Tasks - sell the properties which are showing a stagnant/ reducing prices
4) Context of use - The analyst would consult visualizations to make informed decisions concerning real estate transactions with an aim to increase their profitability.
5) Challenges - Forecasting always carries the risk of uncertainty, hence the analyst would benefit from not merely relying only on the visualizations.

## 3 - Task identification
### Public Affairs Research Analyst -
1) Gain an understanding of poverty rate trends over the years.
2) Study the correlation between income and expenditure.
3) Distribution of people across different education levels.

### A worker being transferred to US as part of their job - 
1) Identify candidate areas suited to comfortably live with their current income.
2) Is it more economic to buy a house or instead rent a house, in the long run?
3) For each state, what is the most frequent reason for a person to move from their current locality?

### Real Estate Analyst - 
1) Examine the price of properties in a region over the years, to decide whether to sell a property or not
2) Check if there is a correlation between the income, income tax and housing prices
3) To analyze the number of people migrating from a region so as to avoid investing much in such regions

## 4 - Data and task abstraction
### 4.1 - Data Abstraction
#### 4.1.1 Dataset
·       The datasets are of type ‘Table’
#### 4.1.2 Attributes
See Project Proposal for mapping

### 4.2. Task Abstraction
#### User 1 : Public Affairs Research Analyst -
1) Gain an understanding of poverty rate trends over the years.
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, PERLIS, FAMLIS would be needed to answer this question
  - Is any extra data or transformation needed?
    We would not need any extra data or transformation for this in addition to the currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Poverty Bucket’ and ‘Compare Trends’
2) Study the correlation between income and expenditure
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, HEARNVAL, HPROP_VAL, FEARNVAL, FHIP_VAL, FMOOP, FMOOP2, PTOTVAL, MOOP, MOOP2, PHIP_VAL, PHIP_VAL2, PMED_VAL, POTC_VAL, SPM_Poor
  - Is any extra data or transformation needed?
    The data that we have is sufficient to answer the question but it would be also useful to have all miscellaneous expenses as well
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Income and Expenditure related columns’, ‘Summarize Expenditure’, and ‘Compare Trends’
3) Distribution of people across different education levels
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, A_HGA
  - Is any extra data or transformation needed?
    We would not need any extra data or transformation for this in addition to the currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Education Levels’, ‘Explore Distribution’

#### User 2 : A worker being transferred to US as part of their job - 
1) Identify candidate areas suited to comfortably live with their current income
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, PTOTVAL, HEARNVAL, MIG_ST, SPM_Poor, PERLIS, FAMLIS, HPROP_VAL
  - Is any extra data or transformation needed?
    The data that we have is sufficient to answer the question but it would be also useful to have all miscellaneous expenses as well
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Income, Poverty Bucket’, ‘Lookup Expenditure’, ’Lookup Property Rates’, ‘Summarize Expenditure’, ‘Compare Trends’
2) Is it more economic to buy a house or instead rent a house, in the long run
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, H_LIVQRT, HPROP_VAL
  - Is any extra data or transformation needed?
    We would not need any extra data or transformation for this in addition to the currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Property Rates’, ‘Lookup Residence Types’, ‘Query Trends’
3) For each state, what is the most frequent reason for a person to move from their current locality
  - Do we need a chart for this?
    We would need a chart to answer this question 
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, NXTRES
  - Is any extra data or transformation needed?
    We would not need any extra data or transformation for this in addition to the currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Migration Reason’, ‘Identify Frequency distribution’ and ‘Locate Extremes’

#### User 3: Real Estate Analyst - 
1) Examine the price of properties in a region over the years, to decide whether to sell a property or not
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GEREG, H_YEAR, HPROP_VAL
  - Is any extra data or transformation needed?
    We would need no extra data or transformation for this data in addition to currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Property Rates’, ‘Identify Trends’
2) Check if there is a correlation between the income, income tax and housing prices
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, FEARNVAL, HEARNVAL, PTOTVAL, HPROP_VAL
  - Is any extra data or transformation needed?
    We would need no extra data or transformation for this data in addition to currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Property Rates’, ‘Lookup Income’, ‘Lookup Income Tax’, and ‘Derive Dependency’
3) To analyze the number of people migrating from a region so as to avoid investing much in such regions
  - Do we need a chart for this?
    We would need a chart to answer this question
  - What columns in dataset needed to answer question?
    GESTFIPS, H_YEAR, HPROP_VAL, MIG_ST
  - Is any extra data or transformation needed?
    We would not need any extra data or transformation for this data in addition to currently presented data
  - What's the Munzner taxonomy classification of the tasks?
    Munzner’s taxonomy - This question can be mapped to ‘Lookup Migration’, ‘Lookup Property Rates’, ‘Identify Trends’
