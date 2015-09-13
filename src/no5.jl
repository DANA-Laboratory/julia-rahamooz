#=!
Julia ميتواند دفعات اجراء خطوط برنامه را شمارش نمايد، و گزارش تولیدی را در یک فایل در  کنار فایل اصلی اما با پسوند cov ذخیره سازد. بررسی گزارش coverage نتایج مفیدی به همراه دارد، به عنوان مثال میتوان از آن جهت بررسي درصد پوشش توابع تست نوشته شده بهره گرفت، يافتن خطوطي از برنامه که هنگام اجرای توابع تست فراخوانده نميشوند از آن جهت اهميت دارد که برنامه نويس را در يافتن نواحي از برنامه که احتمال وجود خطا در آن وجود دارد، ياري ميدهد. 
جهت فعال سازي اين قابليت لازم است Julia با شرط زير فراخوانده شود
!=#
#julia --code-coverage=user -e"include(\"no5.jl\");using Base.Test;@test vectorizeVSdevectorize()"
#=!
محتوای فایل ورودی شامل تنها یک تابع به نام vectorizeVSdevectorize میباشد، این تابع یک عبارت ریاضی ساده را یک بار بصورت برداری (vectorize) و بار دیگر عضو به عضو یا (devectorize) محاسبه میکند:
!=#
function vectorizeVSdevectorize()
    len::Int = 10000
    x = rand(len) # sample data
    y = rand(len) # sample data
    vecresult = exp(-abs(x-y)) #  محاسبه برداری
    devecresult = similar(x) 
    for i = 1:length(x)
        devecresult[i] = exp(-abs(x[i]-y[i]))
    end
    return true;
end
#=!
Julia در کنار فایل ورودی فايل ديگري با نام با پسوند cov (بجای coverage) میسازد، اين فايل تعداد فراخوان هاي مترادف براي هر خط کد از فايل مرجع را گزارش مينمايد: 
!=#
#=
        - function vectorizeVSdevectorize()
        1     len::Int = 10000
        1     x = rand(len) # sample data
        1     y = rand(len) # sample data
        1     vecresult = exp(-abs(x-y)) #  ﻢﺣﺎﺴﺒﻫ ﺏﺭﺩﺍﺭی
        1     devecresult = similar(x)
        1     for i = 1:length(x)
    10000         devecresult[i] = exp(-abs(x[i]-y[i]))
        -     end
        1     return true;
        - end
=#
#=!
محتوای فایل cov نمایانگر پوشش 100% تست انجام شده است. اما اگر هدف مقایسه کارایی این دو روش محاسبه (برداری یا عضو به عضو) با یکدیگر باشد، این اطلاعات ثمربخش نمیباشند، اما یکی دیگر از قابلیت های Julia میتواند داده های مقیدتری تولید نماید. 
به خاطر داشته باشید که یکی از عوامل مهم در کارایی یک الگوریتم، نحوه و مقدار اختصاص حافظه  (memory allocation) میباشد، زیرا اختصاص حافظه فرآیندی زمانبر است، لذا استفاده حداقلی از حافظه میتواند عامل افزایش سرعت محاسبات باشد.
این بار Julia با شرایط مناسب جهت ثبت مقدار حافظه اختصاص داده شده حین اجرای هر کدام از خطوط برنامه، فراخوانده میشود:
!=#
# julia --track-allocation=user -e "include(\"no5.jl\"); using Base.Test; @test vectorizeVSdevectorize() == true"
#=!
گزارش تولیدی با پسوند mem همنام با فایل اصلی و در کنار آن ذخیره میشود:
!=#
#=
        - function vectorizeVSdevectorize()
 34122320     len::Int = 10000
    80088     x = rand(len) # sample data
    80088     y = rand(len) # sample data
   320312     vecresult = exp(-abs(x-y)) #  ﻢﺣﺎﺴﺒﻫ ﺏﺭﺩﺍﺭی
    80048     devecresult = similar(x)
        0     for i = 1:length(x)
        0         devecresult[i] = exp(-abs(x[i]-y[i]))
        -     end
        0     return true;
        - end
=#
#=!
بررسی گزارش mem فایل تولید شده (کد بالا) نشان میدهد در حین محاسبه برداری 213023 واحد و غیر برداری 80048 واحد حافظه اختصاص داده میشود. در تحلیل گزارش فوق باید توجه داشت تعداد واحدهای اختصاص داده شده به خط اول تابع شامل حافظه اختصاص داده شده به کمپایلر و ابزار تعاملی Julia (Julia REPL) نیز میباشد. 
!=#
