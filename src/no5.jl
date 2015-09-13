#=!
Julia ميتواند دفعات اجراء خطوط برنامه را شمارش نمايد، اين قابليت ميتواند کاربردهاي مختلفي داشته، به عنوان مثال آن جهت بررسي درصد پوشش توابع تست نوشته شده بهره گرفته ميشود. يافتن خطوطي از برنامه که هنگام اجراء توابع تست فراخوانده نميشوند از ان جهت اهميت دارد که برنامه نويس را در يافتن نواحي از کد که احتمال وجود خطا در آن وجود دارد ياري ميدهد. 
جهت فعال سازي اين قابليت لازم است Julia را با شرط زير فراخوانيد
!=#
# julia --code-coverage=user -e "include(\"trackandcoverage.jl\"); using Base.Test; @test vectorizeVSdevectorize() == true"
#=!
محتوای فایل trackandcoverage.jl تنها تابع vectorizeVSdevectorize میباشد، این تابع یک عبارت ریاضی ساده را یک بار بصورت برداری vectorize و بار دیگر عضو به عضو یا devectorize محاسبه میکند
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
Julia در کنار trackandcoverage.jl فايل ديگري با نام trackandcoverage.jl.cov توليد مينمايد، اين فايل تعداد فراخوان هاي مترادف براي هر خط کد از فايل مرجع را گزارش مينمايد. 
!=#
#=
=#
