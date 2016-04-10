/*
LivrETS - Centralized system that manages selling of pre-owned ETS goods.
Copyright (C) 2016  TribuTerre

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using LivrETS.Models;
using LivrETS.Services;
using LivrETS.ViewModels.Account;
using System.Collections.Generic;

namespace LivrETS.Controllers
{
    [Authorize(Policy = "AdministrationRights")]
    public class AdminController : Controller
    {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _db;
        
        public AdminController(
            ILoggerFactory loggerFactory,
            ApplicationDbContext db
            )
        {
            _logger = loggerFactory.CreateLogger<AdminController>();
            _db = db;
        }
        
        [HttpGet]
        public IActionResult ManageUsers()
        {
            ViewBag.users = _db.Users.ToList();
            return View();
        }
    }
}