#=!
جوليا به عنوان يک زبان تخصصي انجام محاسبات، توابع متنوعي در موضوع محاسبات آماري (statistics) را تعريف و در اختيار کاربر قرار ميدهد
علاوه بر اين توابع پايه، مجموعه کاملتري از قابليت ها در پکيجهاي جانبي جوليا تعريف شده اند، فهرست مهمترين پکيجهاي تخصصي ي آمار و احتمالات را ميتوان با مراجعه به آدرس https://github.com/JuliaStats دريافت نمود. 
در ارائه مثالهاي اين يادداشت فرض براين است که خواننده از نحوه کار با 1- بردارها و آرايه ها در جوليا و 2- ماکروهاي تست (Unit and Functional Testing) اطلاع دارد.
!=#
using Base.Test
#=!
داده هاي آماري را بصورت برداري از اعداد تصادفي توليد مينماييم
!=#
randomdata = rand(100); # => 100-element Array{Float64,1}
#=!
تابع mean مقدار متوسط داده ها را محاسبه ميکند
!=#
meanval = mean(randomdata) 
@test_approx_eq meanval sum(randomdata)/length(randomdata)
#=!
تابع var وارينس داده ها را محاسبه ميکند 
!=#
varval = var(randomdata) 
@test_approx_eq varval sum((randomdata - meanval).^2) / (length(randomdata) - 1)
#=!
تابع std انحراف از معيار داده هاي را محاسبه ميکند
!=#
stdval = std(randomdata)
@test_approx_eq stdval sqrt(varval)
#=!
تابع middle مقدار مياني را محاسبه ميکند
!=#
midval = middle(randomdata) 
@test_approx_eq midval (maximum(randomdata)+minimum(randomdata))/2

#=!
جهت محاسبه رقم مياني در يک لیست از اعداد از تابع median استفاده نماييد، در صورتي که تعداد اعضاء ليست فرد باشد اين تابع معدل دو ممقدار مياني در ليست را محاسبه مينمايد
!=#
medval = median([ 1 2 3 4 5 ]) # => 3.0
medval = median([ 1 2 3 4 ]) # => (2+3)/2=2.5
#=!
هيستوگرام تقسيم مجموعه داده ها در بازه های (ظرفهاي) مختلف و شمارش تعداد اعضاء هر ظرف ميباشد، تابع hist اين کار انجام ميدهد، این تابع مرز بازه ها را بطور خودکار با استفاده از تابع histrange به صورت حاصلضرب 1، 2 یا 5 از توانهای مختلف عدد 10 باشند. این انتخاب نمودار زیباتری تولید مینماید. 
!=#
hist(1.0:0.1:100.0,5)
#=!
تابع hist مرزهای ظرفها را به همراه تعداد داده های واقع در هر بازه بر میگرداند، تابع midpoints موقعیت میانی بازه ها را محاسبه میکند
!=#
midpoints(0.0:20.0:100.0) # => 10.0:20.0:90.0
#=!
quantile (چَندک) یک احتمال از مجموعه داده ها، برابر است با مقداری که به احتمالِ مورد نظر، داده های مجموعه از آن کوچکتر یا با آن برابر باشند تابع quantile محاسبات مربوطه را انجام میدهد
!=#
data = [10,11,11,11,12,16,17,98,99,100];
le = length(data)
quantile(data,1/le) # => 11.0 data[2]
quantile(data,2/le) # => 11.0 data[3]
quantile(data,6/le) # => 17.0 data[7]
quantile(data,7/le) # => 98.0 data[8]
@test_approx_eq quantile(data,6.2/9) 0.8*data[7]+0.2*data[8]
#=!
cov یا هموردایی یا همبستگی اندازه تغییرات هماهنگ دو متغییر تصادفی است. تابع covariance در زبان Julia محاسبات مربوطه را انجام میدهد.  
!=#
data1 = rand(100);
sort!(data1);
data2 = rand(100);
sort!(data2);
@test_approx_eq cov(data1, data2) sum((data1 .- mean(data1)) .* (data2 .- mean(data2)))/(100-1)
#=!
correlation factor یا ضریب همبستگی، یکی از معیارهای مورد استفاده در تعیین همبستگی دو متغیر است. ضریب همبستگی شدت رابطه و همچنین نوع رابطه (مستقیم یا معکوس) را نشان می‌دهد. این ضریب بین ۱ تا ۱- است و در عدم وجود رابطه بین دو متغیر، برابر صفر است. تابع cor در زبان Julia این ضریب را محاسبه میکند.
!=#
@test_approx_eq cor(data1, data2) cov(data1, data2)/std(data2)/std(data1)
#=!
در پایان اشاره به یک نکته مهم لازم میباشد، در هسته زبان Julia، برخلاف بعضی زبانهای نزدیک مانند R، مقداری که بیانگر فقدان داده اندازه گیری شده باشد وجود ندارد. به این معنی که در محاسبات آماری اگر از بین تعدادی از فاکتورهای مورد مطالعه در یک مجموعه آماری تمام فاکتورها برای کلیه اعضاء مجموعه اندازه گرفته نشده باشند، آنگاه ذخیره سازی داده ها بصورت ماتریسی و انجام عملیات های آماری تنها با استفاده از قابلیت های هسته Julia دشوار میشود، در چنین شرایطی میتوان از بسته توابع DataArray استفاده نمود.
!=#
