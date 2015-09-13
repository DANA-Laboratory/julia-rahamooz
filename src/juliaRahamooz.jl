include("no1.jl");
include("no2.jl");
include("no3.jl");
include("no4.jl");
cd(Pkg.dir(joinpath("juliaRahamooz","src")));
run(`julia --track-allocation=user --code-coverage=user -e "include(\"no5.jl\"); using Base.Test; @test fun(100) == 101"`) 
