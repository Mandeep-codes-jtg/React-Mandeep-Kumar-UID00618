import { FormControl, Input, InputLabel, FormHelperText, Button } from "@mui/material"
import { useForm, type SubmitHandler } from "react-hook-form"


type Inputs = {
  username: string
  password: string
}


export default function FormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch("username"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormControl margin="normal">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input 
                id="username"
                placeholder="enter your username"
                {...register("username")}
            />
        </FormControl>
      </div>
      <div>
        <FormControl margin="normal" error={!!errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input 
                id="password"
                type="password"
                placeholder="enter your password"
                {...register("password",{required: 'password is required.'})}
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
        </FormControl>
      </div>
      
      <Button type="submit" variant="contained" sx={{margin: '20px'}} color="primary">
        Submit
      </Button>
      
    </form>
  )
}